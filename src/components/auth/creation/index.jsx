import React, { useEffect, useRef, useState } from "react";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBasketball,
  faFutbol,
  faVolleyball,
} from "@fortawesome/free-solid-svg-icons";
import { Chip } from "primereact/chip";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";

function ChipCustomList() {
  const [sportList, setSportList] = useState([]);

  useEffect(() => {
    if (sportList.length == 0) {
      setSportList([
        {
          id: 1,
          icon: faBasketball,
          label: "Basketball",
          checked: false,
        },
        {
          id: 2,
          icon: faFutbol,
          label: "Football",
          checked: false,
        },
        {
          id: 3,
          icon: faVolleyball,
          label: "Volleyball",
          checked: false,
        },
      ]);
    }

    console.log(sportList);
  }, [sportList]);

  return (
    <>
      {sportList.map((item, key) => (
        <Chip
          key={item.id}
          className={
            item.checked
              ? "border-1 bg-primary text-white p-2 cursor-pointer select-none"
              : "border-1 surface-100 text-500 p-2 cursor-pointer select-none"
          }
          template={
            <>
              <FontAwesomeIcon icon={item.icon} />
              <span className="ml-2 font-medium">{item.label}</span>
            </>
          }
          onClick={() => {
            setSportList(
              sportList.map((originalItem) => {
                if (originalItem.id - 1 == key) {
                  originalItem.checked = !originalItem.checked;
                  return originalItem;
                }

                return originalItem;
              })
            );
          }}
        />
      ))}
    </>
  );
}

export default function createUser() {
  const stepperRef = useRef(null);
  const toast = useRef(null)
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [email, setEmail] = useState(null);
  const emailRegex = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
  const [password, setPassword] = useState(null);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const navigate = useNavigate()

  const passwordIsSame = () => {
    return password == passwordConfirmation
  }

  const isInputTextNotEmpty = (input) => {
    return input.trim().length > 0
  }

  const formValidation = () => {
    if (isInputTextNotEmpty(firstname) && isInputTextNotEmpty(lastname) && emailRegex.test(email) && passwordIsSame()) {
        navigate("/home")
    } else {
        toast.current.show({
            severity: 'warning',
            summary: "Champs Invalides",
            description: "Un ou plusieurs champs sont invalides. Vueillez les corrigés.",
            life: 5000
        })
    }

  }

  return (
    <div className="card w-10">
      <span className="font-medium text-3xl text-900">
        Création de l'utilisateur
      </span>
      <Toast ref={toast} />
      <Stepper
        ref={stepperRef}
        style={{ flexBasis: "50rem" }}
        orientation="vertical"
      >
        <StepperPanel header="Qui êtes-vous ?">
          <div className="flex flex-column h-fit">
            <div className="border-2 border-1 surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
              <form className="flex flex-wrap gap-5 h-full p-5">
                <FloatLabel>
                  <label
                    htmlFor="firstname"
                    className="block text-900 font-medium"
                  >
                    Prénom
                  </label>
                  <InputText
                    id="firsname"
                    value={firstname}
                    invalid={firstname && !isInputTextNotEmpty(firstname) }
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </FloatLabel>

                <FloatLabel>
                  <label
                    htmlFor="lastname"
                    className="block text-900 font-medium"
                  >
                    Nom de famille
                  </label>
                  <InputText
                    id="lastname"
                    value={lastname}
                    invalid={lastname && !isInputTextNotEmpty(lastname) }
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </FloatLabel>

                <FloatLabel>
                  <label htmlFor="email" className="block text-900 font-medium">
                    Email
                  </label>
                  <InputText
                    id="email"
                    type="text"
                    value={email}
                    invalid={email && !emailRegex.test(email)}
                    onChange={(e) => {setEmail(e.target.value); emailRegex.test(email) }}
                  />
                </FloatLabel>

                <FloatLabel>
                  <label
                    htmlFor="password"
                    className="block text-900 font-medium"
                  >
                    Mot de passe
                  </label>
                  <InputText
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FloatLabel>

                <FloatLabel>
                  <label
                    htmlFor="passwordConfirmation"
                    className="block text-900 font-medium"
                  >
                    Confirmer le mot de passe
                  </label>
                  <InputText
                    id="passwordConfirm"
                    type="password"
                    invalid={passwordConfirmation && !passwordIsSame()}
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                  />
                </FloatLabel>
              </form>
            </div>
          </div>
          <div className="flex py-4">
            <Button
              label="Next"
              icon="pi pi-arrow-right"
              iconPos="right"
              onClick={() => stepperRef.current.nextCallback()}
            />
          </div>
        </StepperPanel>
        <StepperPanel header="Quel sport souhaitez-vous suivre ?">
          <div className="flex py-4 ">
            <Button
              label="Back"
              severity="secondary"
              icon="pi pi-arrow-left"
              onClick={() => stepperRef.current.prevCallback()}
            />
          </div>
          <div className="flex flex-column h-12rem">
            <div className="border-2 border-1 surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium gap-2">
              <ChipCustomList />
            </div>
          </div>
          <div className="flex py-4 ">
            <Button
              label="Valider l'inscription"
              icon="pi pi-check"
              iconPos="right"
              onClick={() => formValidation()}
            />
          </div>
        </StepperPanel>
      </Stepper>
    </div>
  );
}
