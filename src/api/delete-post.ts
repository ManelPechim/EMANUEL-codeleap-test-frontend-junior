import { useCallback } from 'react'
import API from './api-url'
import type { User } from '../types/user';

type Data = {
  username: string;
};

export default function useDeletePost () { 
  const deleteUserPost = useCallback(async(input: Data): Promise<User> => {
    const getExistingUser = await API.get<User[]>("/users", { // Faz uma busca de usuários filtrando por username.
      params: { username: input.username }, // Envia query params para o backend retornar apenas o usuário alvo.
    }); // Aguarda a resposta da busca antes de continuar.

    const existingUser = getExistingUser.data[0];

    if (!existingUser?.id) throw new Error('User not found for post delete.');

    const deletePostResponse = await API.put<User>(`/users/${existingUser.id}`, {
      ...existingUser,
      title: '',
      content: '',
    });

    const responseData = deletePostResponse.data;

    return responseData;

  }, []);

  return { deleteUserPost };
}