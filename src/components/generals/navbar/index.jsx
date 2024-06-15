import React from "react";
import { Menubar } from "primereact/menubar";
import { Badge } from "primereact/badge";
import { Avatar } from "primereact/avatar";
import {
  faBasketball,
  faFutbol,
  faTableTennisPaddleBall,
  faVolleyball,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const itemRenderer = (item) => (
    <a className="flex align-items-center p-menuitem-link">
      <FontAwesomeIcon icon={item.icon} />
      <span className="mx-2">{item.label}</span>
      {item.badge && <Badge className="ml-auto" value={item.badge} />}
    </a>
  );

  const navigate = useNavigate()

  const items = [
    {
      label: "Accueil",
      icon: "pi pi-home",
      url: "/home"
    },
    {
      label: "Mes favoris",
      icon: "pi pi-star",
    },
    {
      label: "Sports",
      icon: <FontAwesomeIcon className="mr-2" icon={faTableTennisPaddleBall} />,
      items: [
        {
          id: 1,
          icon: faBasketball,
          label: "Basketball",
          template: itemRenderer,
        },
        {
          id: 2,
          icon: faFutbol,
          label: "Football",
          template: itemRenderer,
        },
        {
          id: 3,
          icon: faVolleyball,
          label: "Volleyball",
          template: itemRenderer,
        },
      ],
    }
  ];

  const start = <img alt="logo" src="/jo-24.jpg" height="50" width="50"></img>;
  const end = (
    <Avatar
      icon="pi pi-user"
      className="cursor-pointer"
      size="large"
      shape="circle"
      onClick={() => navigate("/profile")}
    />
  );

  return (
    <div className="card">
      <Menubar model={items} start={start} end={end} />
    </div>
  );
}
