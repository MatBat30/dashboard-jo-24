import { createContext, useContext } from "react";

const UserContext = createContext();
export default UserContext;

export function useUserContext() {
  const user = useContext(UserContext);
  if (user == undefined) throw new Error("userContext is undefined");
  return user;
}

export function updateUserContext(data) {
  if (data == undefined)
    throw new Error("cannot create context because data is undefined");
  UserContext = createContext(data);
  return useUserContext();
}

export function deleteUserContext() {
  UserContext = createContext(undefined);
  return useUserContext();
}
