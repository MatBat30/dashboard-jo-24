import { useContext, useEffect } from "react";
import NavBar from "../../generals/navbar";
import UserContext from "../../../hooks/contextUser";
import { Navigate } from "react-router-dom";

function ProfileDetails() {
  const { user, setUser } = useContext(UserContext);

  if (user) {
    useEffect(() => {
      if (user == null) {
        setUser(JSON.parse(localStorage.getItem("user")))
      }
  
      console.log(user);
    }, [])
    return (
      <div className="w-full flex flex-column">
        <div>
          <NavBar />
        </div>

        <div className="surface-0 p-5">
          <div className="font-medium text-3xl text-900 mb-3">
            Détails de votre compte
          </div>
          <ul className="list-none p-0 m-0">
            <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
              <div className="text-500 w-6 md:w-2 font-medium">Prénom</div>
              <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                {user.firstname}
              </div>
            </li>
            <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
              <div className="text-500 w-6 md:w-2 font-medium">Nom</div>
              <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                {user.lastname}
              </div>
            </li>
            <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
              <div className="text-500 w-6 md:w-2 font-medium">
                Date de naissance
              </div>
              <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                {new Date(user.birthday).toLocaleDateString()}
              </div>
            </li>
            <li className="flex align-items-center py-3 px-2 border-top-1 border-bottom-1 border-300 flex-wrap">
              <div className="text-500 w-6 md:w-2 font-medium">Email</div>
              <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1 line-height-3">
                {user.email}
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
  return <Navigate to="/login" />;
}

export default ProfileDetails;
