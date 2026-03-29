import { useCallback } from 'react';
import type { User } from '../types/user'; 
import API from './api-url' 

type PostInput = { 
  username: string 
  title: string 
  content: string 
  created_datetime: string
};

export default function usePatchPosts () { 
  const patchUserPost = useCallback(async (input: PostInput): Promise<User> => {

    const getExistingUser = await API.get<User[]>("/users", {
      params: { username: input.username }, // Envia query params para o backend retornar apenas o usuário alvo.
    }); 

    const existingUser = getExistingUser.data[0]; // Pega o primeiro usuário retornado (assumindo username único).

    if (!existingUser?.id) throw new Error("User not found for post update.");

    const createPostResponse = await API.put<User>(`/users/${existingUser.id}`, { // MockAPI (free) não suporta PATCH, então usamos PUT para atualização completa.
      ...existingUser,
      title: input.title, // Atualiza/define o título com o valor vindo do formulário.
      content: input.content, // Atualiza/define o conteúdo com o valor vindo do formulário.
      created_datetime: new Date().toISOString(),
    }); // Aguarda a resposta da atualização.

    const responseData = createPostResponse.data // Extrai o payload retornado pela API após o PATCH.

    return responseData; // Retorna os dados atualizados para quem chamou essa função.
  }, []) // Dependências vazias: a referência da função permanece a mesma entre renders.

  return { patchUserPost }; // Expõe a função para os componentes consumirem esse hook.
}; // Finaliza o hook customizado.