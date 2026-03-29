import { useCallback } from "react";
import type { User } from "../types/user";
import API from "./api-url";

type UsernameInput = {
  username: string;
};

export default function usePostAuthUsers() {
  const createAuthUser = useCallback(async (input: UsernameInput): Promise<User> => {
    const inputUsername = input.username.trim();

    const { data } = await API.get<User[]>("/users"); // Faz uma busca de usuários
    const existingUser = data.find((user) => user?.username.toLowerCase() === inputUsername.toLowerCase()); // Procura por usuário que que tenha o mesmo 'username' do input 'username' digitado 

    if (existingUser) return existingUser; // Se o usuúario existe, retorna o usuário que existe, fazendo assim o "login" [...] ->
    // Se não, cria um novo usuário ↓
    const createdUserResponse = await API.post<User>("/users", { // Faz a inserção de um novo usuário
      username: inputUsername,
      title: "",
      content: "",
      created_datetime: ""
    });

    return createdUserResponse.data;
  }, []);

  return { createAuthUser };
}
