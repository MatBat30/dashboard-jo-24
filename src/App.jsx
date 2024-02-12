import { PrimeReactProvider } from "primereact/api";
import { useRef, useState } from "react";
import { Toast } from "primereact/toast";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {
  const toast = useRef(null);
  const router = createBrowserRouter([
    {
      path: "/",
      element: 'Ici mon composant'
    }
  ])

  return (
    <>
      <PrimeReactProvider>
        <section className="w-full flex flex-column align-items-center h-full">
          {/* Ajoutez ici le dashboard */}
          <RouterProvider router={router} />
        </section>
        <Toast ref={toast} />
      </PrimeReactProvider>
    </>
  );
}

export default App;
