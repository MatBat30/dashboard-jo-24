import React, { useContext, useRef, useState } from "react";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { FloatLabel } from "primereact/floatlabel";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import ProfileService from "/src/services/profile";
import { Password } from "primereact/password";

export default function createUser() {
  const stepperRef = useRef(null);
  const toast = useRef(null);
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [email, setEmail] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const emailRegex = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
  const birthdayRegex = new RegExp(
    "^(0[1-9]|1[012])[-/.](0[1-9]|[12][0-9]|3[01])[-/.](19|20)\\d\\d$"
  );
  const [password, setPassword] = useState(null);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const navigate = useNavigate();

  const passwordIsSame = () => {
    return password == passwordConfirmation;
  };

  const isInputTextNotEmpty = (input) => {
    return input.trim().length > 0;
  };

  const formValidation = async () => {
    if (
      isInputTextNotEmpty(firstname) &&
      isInputTextNotEmpty(lastname) &&
      emailRegex.test(email) &&
      passwordIsSame() &&
      birthdayRegex.test(birthday)
    ) {
      let req = await ProfileService.createUser(
        lastname,
        firstname,
        birthday,
        email,
        password
      );

      const userResponse = req.user;
      let finalUserModel = {
        id: userResponse.user_id,
        firstname: userResponse.prenom,
        lastname: userResponse.nom,
        birthday: userResponse.date_naissance,
        email: userResponse.email,
      };

      if (req.status == 200) {
        localStorage.setItem("user", JSON.stringify(finalUserModel));
        navigate("/home");
      } else {
        toast.current.show({
          severity: "error",
          summary: "Erreur",
          detail: "L'utilisateur existe déjà",
          life: 5000,
        });
      }
    } else {
      toast.current.show({
        severity: "warn",
        summary: "Champs Invalides",
        detail: "Un ou plusieurs champs sont invalides. Vueillez les corrigés.",
        life: 5000,
      });
    }
  };

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
          <div className="flex py-4">
            <Button
              label="Retour à la page de connexion"
              icon="pi pi-arrow-left"
              iconPos="left"
              severity="secondary"
              onClick={() => {
                navigate("/login");
              }}
            />
          </div>
          <div className="flex flex-column h-fit">
            <div className="border-2 border-1 surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
              <form className="flex flex-wrap gap-5 h-full p-5">
                <FloatLabel className="w-5">
                  <InputText
                    id="firsname"
                    value={firstname}
                    className="w-full"
                    invalid={firstname && !isInputTextNotEmpty(firstname)}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                  <label htmlFor="firstname" className="text-900 font-medium">
                    Prénom
                  </label>
                </FloatLabel>

                <FloatLabel className="w-5">
                  <InputText
                    id="lastname"
                    value={lastname}
                    className="w-full"
                    invalid={lastname && !isInputTextNotEmpty(lastname)}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                  <label
                    htmlFor="lastname"
                    className="block text-900 font-medium"
                  >
                    Nom de famille
                  </label>
                </FloatLabel>

                <FloatLabel className="w-5">
                  <InputText
                    id="email"
                    type="text"
                    value={email}
                    invalid={email && !emailRegex.test(email)}
                    className="w-full"
                    onChange={(e) => {
                      setEmail(e.target.value);
                      emailRegex.test(email);
                    }}
                  />
                  <label htmlFor="email" className="block text-900 font-medium">
                    Email
                  </label>
                </FloatLabel>

                <FloatLabel className="w-5">
                  <InputMask
                    id="birthday"
                    mask="99/99/9999"
                    value={birthday}
                    className="w-full"
                    invalid={birthday && !birthdayRegex.test(birthday)}
                    onChange={(e) => setBirthday(e.target.value)}
                  />
                  <label htmlFor="birthday" className="text-900 font-medium">
                    Date de naissance
                  </label>
                </FloatLabel>

                <FloatLabel className="w-5">
                  <Password
                    id="password"
                    type="password"
                    toggleMask
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    pt={{
                      input: { className: "w-full" },
                      root: { className: "w-full block" },
                    }}
                  />
                  <label
                    htmlFor="password"
                    className="block text-900 font-medium"
                  >
                    Mot de passe
                  </label>
                </FloatLabel>

                <FloatLabel className="w-5">
                  <Password
                    id="passwordConfirm"
                    type="password"
                    invalid={passwordConfirmation && !passwordIsSame()}
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    pt={{
                      input: { className: "w-full" },
                      root: { className: "w-full block" },
                    }}
                    toggleMask
                    feedback={false}
                  />
                  <label
                    htmlFor="passwordConfirmation"
                    className=" text-900 font-medium"
                  >
                    Confirmer le mot de passe
                  </label>
                </FloatLabel>
              </form>
            </div>
          </div>
          <div className="flex py-4">
            <Button
              label="Valider l'inscription"
              icon="pi pi-check"
              iconPos="right"
              onClick={() => {
                formValidation();
              }}
            />
          </div>
        </StepperPanel>
      </Stepper>
    </div>
  );
}
