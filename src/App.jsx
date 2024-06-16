import { PrimeReactProvider } from "primereact/api";
import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

// PrimeReact
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

// Mes composants
import NotFound from "./components/landing/not-found";
import HomePage from "./components/landing/home";
import LoginPage from "./components/auth/login";
import CreateUser from "./components/auth/creation";
import ProfileDetails from "./components/profile/details";
import ProfileEdit from "./components/profile/edit";
import { UserContext } from "./hooks/contextUser";

function App() {
  const toast = useRef(null);
  const PrimeReactConfig = {
    ripple: true,
  };
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/login" />,
    },
    {
      path: "/home",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/create",
      element: <CreateUser />,
    },
    {
      path: "/404",
      element: <NotFound />,
    },
    {
      path: "/profile",
      element: <ProfileDetails />,
      children: [
        {
          path: "edit",
          element: <ProfileEdit />,
        },
      ],
    },
  ]);

  const [user, setUserContext] = useState(undefined)

  return (
    <>
      <PrimeReactProvider value={PrimeReactConfig}>
        <UserContext.Provider value={{user, setUserContext}}>
          <section className="w-full h-full flex flex-column align-items-center">
            <RouterProvider router={routes} />
          </section>
        </UserContext.Provider>
        <Toast ref={toast} />
      </PrimeReactProvider>
    </>
  );
}

export default App;
