import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useParams } from "react-router-dom";
import EventService from "../../../../services/event/index";
import NavBar from "../../../generals/navbar";
import { DataView } from "primereact/dataview";

function DataViewEventChild({ matches }) {
  const cardHeader = (match, index) => (
    <>
      <div>
        <span>Épreuve : {match.sport} </span>
      </div>
    </>
  );
  const cardFooter = (match, index) => (
    <>
      <span>{match.score}</span>
    </>
  );

  const itemTemplate = async (match, index) => {
    let team = await EventService.getTeams(match.equipe1_id);
    let opponent = await EventService.getTeams(match.equipe2_id);

    if (team.event && opponent.event) {
        return (
            <Card
              title="Advanced Card"
              subTitle="Card subtitle"
              footer={cardFooter}
              header={cardHeader}
              className="md:w-25rem"
            >
              <p className="m-0">{team.event}</p>
              <p className="mt-5">{opponent.event}</p>
            </Card>
        );   
    } else {
        return(
            <Card
              title="Éléments Indisponible"
              subTitle="Désolé"
              footer={cardFooter}
              header={cardHeader}
              className="md:w-25rem"
            >
              <p className="m-0">{team.event}</p>
              <p className="mt-5">{opponent.event}</p>
            </Card>
        )
    }

  };

  const listTemplate = (items) => {
    if (!items || items.length === 0) return null;
    let list = items.map((match, index) => {
      return itemTemplate(match, index);
    });

    return <div className="grid grid-nogutter">{list}</div>;
  };

  return (
    <DataView value={matches} listTemplate={listTemplate} paginator rows={8} />
  );
}

export default function EventChild() {
  let { id_event } = useParams();
  const [listMatch, setMatchList] = useState([]);

  useEffect(() => {
    EventService.getMatch().then((res) => setMatchList(res.matches));
  }, [id_event]);

  return (
    <div className="w-full flex flex-column justify-content-center gap-5">
      <NavBar />
      <DataViewEventChild matches={listMatch} />
    </div>
  );
}
