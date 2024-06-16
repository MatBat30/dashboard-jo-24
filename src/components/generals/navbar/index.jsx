import React, { useRef } from "react";
import { Menubar } from "primereact/menubar";
import { Badge } from "primereact/badge";
import { Avatar } from "primereact/avatar";
import { faMedal } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import { deleteUserContext } from "../../../hooks/contextUser";

export default function NavBar() {
  const itemRenderer = (item) => (
    <a className="flex align-items-center p-menuitem-link">
      <FontAwesomeIcon icon={item.icon} />
      <span className="mx-2">{item.label}</span>
      {item.badge && <Badge className="ml-auto" value={item.badge} />}
    </a>
  );

  const navigate = useNavigate();
  const ProfilePanel = useRef(null);

  const items = [
    {
      label: "Accueil",
      icon: "pi pi-home",
      url: "/home",
    },
    {
      label: "Épreuves",
      icon: <FontAwesomeIcon className="mr-2" icon={faMedal} />,
      url: "events",
    },
  ];

  const start = <img alt="logo" src="/jo-24.jpg" height="50" width="50"></img>;
  const end = (
    <div>
      <Avatar
        icon="pi pi-user"
        className="cursor-pointer"
        size="large"
        shape="circle"
        onClick={(e) => ProfilePanel.current.toggle(e)}
      />
      <OverlayPanel ref={ProfilePanel} className="right-0">
        <Button
          label="Détails du compte"
          icon="pi pi-user"
          iconPos="left"
          className="w-full"
          severity="info"
          text
          onClick={() => navigate("/profile/details")}
        />
        <Button
          label="Modifier mon compte"
          icon="pi pi-pencil"
          iconPos="left"
          className="w-full"
          severity="info"
          text
          onClick={() => navigate("/profile/edit")}
        />
        <Button
          label="Déconnexion"
          className="w-full"
          icon="pi pi-sign-out"
          iconPos="left"
          severity="danger"
          outlined
          onClick={() => deleteUserContext()}
        />
      </OverlayPanel>
    </div>
  );

  return (
    <div className="card">
      <Menubar model={items} start={start} end={end} />
    </div>
  );
}
