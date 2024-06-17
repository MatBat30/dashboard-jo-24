import { createContext } from "react";

let userInStorage = JSON.parse(localStorage.getItem("user"))

let finalUser = {
    id: userInStorage.id,
    firstname: userInStorage.firstname,
    lastname: userInStorage.lastname,
    birthday: userInStorage.birthday,
    email: userInStorage.email,
}

const UserContext = createContext(finalUser);
export default UserContext;
