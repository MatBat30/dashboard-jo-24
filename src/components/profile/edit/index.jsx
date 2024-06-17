import NavBar from "../../generals/navbar";
import { useContext, useState } from "react";
import UserContext from "../../../hooks/contextUser";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

function ProfileEdit() {
  const { user, setUser } = useContext(UserContext);

  const [modifiedUserFirstname, setModifiedUserFirstname] = useState(null);
  const [modifiedUserLastname, setModifiedUserLastname] = useState(null);
  const [modifiedUserBirthday, setModifiedUserBirthday] = useState(null);
  const [modifiedUserEmail, setModifiedUserEmail] = useState(null);
  const [modifiedUserPassword, setModifiedUserPassword] = useState(null);
  const [
    modifiedUserPasswordConfirmation,
    setModifiedUserPasswordConfirmation,
  ] = useState(null);

  return (
    <div className="w-full flex flex-column">
      <div>
        <NavBar />
      </div>

      <div className="surface-0 p-5">
        <div className="font-medium text-3xl text-900 mb-3">
          Modification de votre compte
        </div>
        <ul className="list-none p-0 m-0">
          <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">Prénom</div>
            <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
              <InputText
                value={user.firstname}
                onChange={(e) => setModifiedUserFirstname(e.target.value)}
              />
            </div>
          </li>
          <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">Nom</div>
            <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
              <InputText
                value={user.lastname}
                onChange={(e) => setModifiedUserLastname(e.target.value)}
              />
            </div>
          </li>
          <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">
              Date de naissance
            </div>
            <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
              {new Date(user.birthday).toLocaleDateString()}
              <Calendar
                value={user.birthday}
                onChange={(e) => setModifiedUserBirthday(e.target.value)}
              />
            </div>
          </li>
          <li className="flex align-items-center py-3 px-2 border-top-1 border-bottom-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">Email</div>
            <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1 line-height-3">
              <InputText
                value={user.email}
                onChange={(e) => setModifiedUserEmail(e.target.value)}
              />
            </div>
          </li>
          <li className="flex align-items-center py-3 px-2 border-top-1 border-bottom-1 border-300 flex-wrap">
            <div className="text-500 w-4  font-medium">
              Nouveau mot de passe
            </div>
            <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1 line-height-3">
              <Password
                value={modifiedUserPassword}
                toggleMask
                onChange={(e) => setModifiedUserPassword(e.target.value)}
              />
            </div>
          </li>
          <li className="flex align-items-center py-3 px-2 border-top-1 border-bottom-1 border-300 flex-wrap">
            <div className="text-500 w-4 font-medium">
              Confirmer le mot de passe
            </div>

            <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1 line-height-3">
              <Password
                value={modifiedUserPasswordConfirmation}
                toggleMask
                feedback={false}
                onChange={(e) =>
                  setModifiedUserPasswordConfirmation(e.target.value)
                }
              />
            </div>
          </li>
        </ul>
        <Button label="Valider les changements" className="mt-2" />
      </div>
    </div>
  );
}

export default ProfileEdit;
