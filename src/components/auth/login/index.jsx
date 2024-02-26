import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { useState } from "react";

function LoginPage() {
  const [isBinary, setIsBinary] = useState(true);

  return (
    <div className="flex w-full h-full">
      <div className="surface-section w-full md:w-6 p-6 md:p-8 ">
        <form className="flex flex-column justify-content-evenly h-full">
          <div className="mb-5">
            <img
              src="/jo-24.jpg"
              alt="logo JO 2024"
              height="100"
              className="mb-3"
            />
            <div className="text-900 text-3xl font-medium mb-3">Bienvenue</div>
            <span className="text-600 font-medium mr-2">Pas de compte ?</span>
            <a
              className="font-medium no-underline text-blue-500 cursor-pointer"
              href="/create/user"
            >
              C'est par ici !
            </a>
          </div>
          <div>
            <label htmlFor="email" className="block text-900 font-medium mb-2">
              Email
            </label>
            <InputText
              id="email"
              type="text"
              placeholder="Adresse Email"
              className="w-full mb-3 p-3"
            />

            <label
              htmlFor="password"
              className="block text-900 font-medium mb-2"
            >
              Mot de passe
            </label>
            <InputText
              id="password"
              type="password"
              placeholder="Mot de passe"
              className="w-full mb-3 p-3"
            />

            <div className="flex align-items-center justify-content-between mb-6">
              <div className="flex align-items-center">
                <Checkbox
                  id="remember"
                  binary={isBinary.toString()}
                  className="mr-2"
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
            ></Button>
          </div>
        </form>
      </div>
      <div
        className="hidden md:block w-6 bg-no-repeat bg-cover border-round"
        style={{
          backgroundImage: "url('/jo-24.jpg')",
        }}
      ></div>
    </div>
  );
}

export default LoginPage;
