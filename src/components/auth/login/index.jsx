import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { useContext, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import ProfileService from "../../../services/profile";
import { useNavigate } from "react-router-dom";
import { FloatLabel } from "primereact/floatlabel";
import UserContext from "../../../hooks/contextUser";

function LoginPage() {
  const [isBinary, setIsBinary] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setUser} = useContext(UserContext)
  const toast = useRef(null);
  const navigate = useNavigate();

  const handleKeyDownEnter = (event) => {
    if (event.key === 'Enter') {
      loginHandler()
    }
  }

  const loginHandler = async () => {
    if (email.trim() != "" && password.length > 0) {
      let isUserLogged = await ProfileService.loginUser(email, password);

      const userResponse  = isUserLogged.user
      let finalUserModel = {
        id: userResponse.user_id,
        firstname: userResponse.prenom,
        lastname: userResponse.nom,
        birthday: userResponse.date_naissance,
        email: userResponse.email,
      }

      if (isUserLogged.status == 200) {
        localStorage.setItem("user", JSON.stringify(finalUserModel))
        setUser(finalUserModel)
        navigate("/home");
      } else if (isUserLogged.status == 401) {
        toast.current.show({
          severity: "danger",
          summary: "Identifiant éronné",
          detail: "Nous n'avons pas pu vous authentifier",
          life: 3000,
        });
      } else if (isUserLogged.status == 500) {
        toast.current.show({
          severity: "danger",
          summary: "Erreur Serveur",
          detail: "Un problème est survenu sur nos serveurs. Veuillez réessayer plus tard.",
          life: 5000,
        });
      }
    } else {
      toast.current.show({
        severity: "warn",
        summary: "Champs mal saisies ou manquants",
        detail: "Veuillez remplir les champs",
        life: 3000,
      });
    }
  };

  return (
    <div className="flex w-full h-full">
      <div className="surface-section w-full md:w-6 p-6 md:p-5 ">
        <div className="flex flex-column align-content-center justify-content-center h-full">
          <img
            src="/jo-24.jpg"
            alt="logo JO 2024"
            height="100"
            width="100"
            className="mb-3"
          />
          <div className="mb-5">
            <div className="text-900 text-3xl font-medium mb-3">Bienvenue</div>
            <span className="text-600 font-medium mr-2">Pas de compte ?</span>
            <a
              className="font-medium no-underline text-blue-500 cursor-pointer"
              href="/create"
            >
              C'est par ici !
            </a>
          </div>
          <div className="w-full flex flex-column gap-5">
            <FloatLabel>
              <InputText
                id="email"
                type="text"
                placeholder="Adresse Email"
                value={email}
                className="w-full"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label
                htmlFor="email"
                className="block text-900 font-medium mb-2"
              >
                Email
              </label>
            </FloatLabel>

            <FloatLabel>
              <Password
                inputId="password"
                value={password}
                feedback={false}
                toggleMask
                pt={
                  {
                    input: {className: "w-full"},
                    root: {className: "w-full block"}
                  }
                }
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password" className=" text-900 font-medium mb-2">
                Mot de passe
              </label>
            </FloatLabel>

            <div className="flex align-items-center justify-content-between">
              <div className="flex align-items-center">
                <Checkbox
                  id="remember"
                  binary={isBinary.toString()}
                  className="mr-2"
                  value={isBinary}
                  onChange={(e) => setIsBinary(e.target.value)}
                />
                <label htmlFor="remember">Se souvenir de moi</label>
              </div>
              <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">
                Mot de passe oublié ?
              </a>
            </div>

            <Button
              label="Se connecter"
              icon="pi pi-user"
              className="w-full p-3"
              onClick={() => loginHandler()}
              onKeyUp={handleKeyDownEnter}
            />
          </div>
        </div>
      </div>
      <div
        className="hidden md:block w-6 bg-no-repeat bg-contain bg-center border-round"
        style={{
          backgroundImage: "url('/jo-24.jpg')",
        }}
      ></div>
      <Toast ref={toast} />
    </div>
  );
}

export default LoginPage;
