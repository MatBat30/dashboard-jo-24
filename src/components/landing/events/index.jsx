import React, { useState, useEffect, useContext } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import EventService from "../../../services/event";
import ProfileService from "../../../services/profile";
import { Button } from "primereact/button";
import { ToggleButton } from "primereact/togglebutton";
import UserContext from "../../../hooks/contextUser";
import NavBar from "../../generals/navbar";

export default function EventData() {
  const [events, setEvents] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    EventService.getEvent().then((res) => {
      let events = res.events.map((item) => {
        return { ...item, favourite: false };
      });
      setEvents(events);
    });
  }, []);

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">Les épreuves</span>
      <Button icon="pi pi-refresh" rounded raised />
    </div>
  );

  const dateBody = (events, { field }) => {
    return <span>{new Date(events[field]).toLocaleDateString()}</span>;
  };

  return (
    <section className="w-full gap-5 flex flex-column">
      <NavBar />
    <DataTable
      value={events}
      tableStyle={{ minWidth: "50rem" }}
      header={header}
      paginator
      rows={5}
      rowsPerPageOptions={[5, 10, 25, 50]}
      className="w-full"
    >
      <Column field="sport" header="Sport" sortable></Column>
      <Column field="categorie" header="Catégorie" sortable></Column>
      <Column
        field="date_debut"
        header="Début"
        sortable
        body={dateBody}
      ></Column>
      <Column field="date_fin" header="Fin" sortable body={dateBody}></Column>
      <Column>
        <ToggleButton
          icon="pi pi-star"
          onClick={() => ProfileService.addFavori(user.id)}
        />
      </Column>
    </DataTable>
    </section>
  );
}
