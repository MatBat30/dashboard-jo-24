import React from "react";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Avatar } from "primereact/avatar";

export default function TemplateDemo() {
  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
    },
    {
      label: "Features",
      icon: "pi pi-star",
    },
  ];

  function loadProfileImage() {
    return '/default_user.jpg'
  }

  const start = (
    <img
      alt="logo"
      src="https://eu.ftp.opendatasoft.com/paris2024/emblem-white.svg"
      className="mr-2 border-round-2xl p-2 w-4rem"
    ></img>
  );
  const end = (
    <div className="flex align-items-center gap-2">
      <InputText
        placeholder="Search"
        type="text"
        className="w-8rem sm:w-auto"
      />
      <Avatar
        image={loadProfileImage()}
        shape="circle"
      />
    </div>
  );

  return (
    <div className="w-full">
      <Menubar model={items} start={start} end={end} className="bg-yellow-200" />
    </div>
  );
}
