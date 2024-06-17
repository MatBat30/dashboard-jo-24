import React, { useState, useEffect, useContext } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import EventService from "../../../services/event";
import { Button } from "primereact/button";
import UserContext from "../../../hooks/contextUser";
import NavBar from "../../generals/navbar";
import { useNavigate } from "react-router-dom";

export default function EventData() {
  const [events, setEvents] = useState([]);
  const { user } = useContext(UserContext);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    sport: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    cartegorie: { value: null, matchMode: FilterMatchMode.CONTAINS },
    date_debut: { value: null, matchMode: FilterMatchMode.DATE_IS },
    date_fin: { value: null, matchMode: FilterMatchMode.DATE_IS },
  });

  useEffect(() => {
    EventService.getEvent().then((res) => {
      let events = res.events.map((item) => {
        return { ...item, favourite: false };
      });
      setEvents(events);
    });
  }, []);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div>
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
          <span className="text-xl text-900 font-bold">Les épreuves</span>
        </div>
        <div className="flex justify-content-end gap-3 align-items-center">
          <Button icon="pi pi-refresh" rounded raised />
          <IconField iconPosition="left">
            <InputIcon className="pi pi-search" />
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Keyword Search"
            />
          </IconField>
        </div>
      </div>
    );
  };

  const dateBody = (events, { field }) => {
    return <span>{new Date(events[field]).toLocaleDateString()}</span>;
  };

  return (
    <section className="w-full gap-5 flex flex-column">
      <NavBar />
      <DataTable
        value={events}
        tableStyle={{ minWidth: "50rem" }}
        header={renderHeader()}
        filters={filters} filterDisplay="row"
        paginator
        removableSort
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        className="w-full"
        selectionMode="single"
        selection={selectedEvent}
        onSelectionChange={(e) => navigate(`/event/${e.value.epreuve_id}`)}
        dataKey="epreuve_id"
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
      </DataTable>
    </section>
  );
}
