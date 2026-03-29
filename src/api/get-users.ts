import { useCallback } from "react";
import type { User } from "../types/user";
import API from "./api-url";

type UserProps = {
  username: string | undefined;
};

export default function useGetUsers() {
  const getUsers = useCallback(async () => {
    const { data } = await API.get<User[]>('/users');
    return data;
  }, []);

  const getUsersParams = useCallback(async (input: UserProps): Promise<User> => {
    const { data } = await API.get<User[]>("/users", {
        params: { username: input.username }, // Envia query params para o backend retornar apenas o usuário alvo.
    }); 
    const existingUser = data[0];

    if(!existingUser) throw new Error("deu algum erro no getUserParams mano");

    return existingUser;
  }, []);

  return { getUsers, getUsersParams };
}