import { PrimeReactProvider } from "primereact/api";
import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// PrimeReact
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

// Mes composants
import NotFound from "./components/landing/not-found";
import Discovery from "./components/landing/discovery";
import LoginPage from "./components/auth/login";

function App() {
  const toast = useRef(null);
  const router = createBrowserRouter([
    {
      path: "/",
      Component: Discovery,
    },
    {
      path: "/404",
      Component: NotFound,
    },
    {
      path: "/login",
      Component: LoginPage,
    },
  ]);
  const PrimeReactConfig = {
    ripple: true,
  };

  return (
    <>
      <PrimeReactProvider value={PrimeReactConfig}>
        <section className="w-full h-full flex flex-column align-items-center">
          {/* Ajoutez ici le dashboard */}
          <RouterProvider router={router} />
        </section>
        <Toast ref={toast} />
      </PrimeReactProvider>
    </>
  );
}

export default App;
