/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { User } from "../types/user";

type UserContextProps = {
  currentUser: User | null
  setUser: (user: User | null) => void
	authReady: boolean
	// logout: () => void
};

const UserContext = createContext<UserContextProps>({
	currentUser: null,
	setUser: () => undefined,
	authReady: false,
	// logout: () => undefined,
});

const USER_STORAGE_KEY = "local.auth.user";

function UserProvider ({ children }: {children: React.ReactNode}) {
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [authReady, setAuthReady] = useState(false);

	useEffect(() => { // Hidratação do usuário salvo, armazenando em local storage e basicamente carrega sessão anterior
		try {
			const storedUser = localStorage.getItem(USER_STORAGE_KEY);
			if (storedUser) setCurrentUser(JSON.parse(storedUser));
			
		} catch {
			localStorage.removeItem(USER_STORAGE_KEY);
			setCurrentUser(null);

		} finally {
		  setAuthReady(true);
		}
	}, []);

	useEffect(() => { // Persistencia no local storage, mantendo local storage sincronizado com o estado atual
		if (!authReady) return;

		if (currentUser) {
			localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(currentUser));
			return;
		}

		localStorage.removeItem(USER_STORAGE_KEY);
	}, [authReady, currentUser]);

	const setUser = useCallback((nextUser: User | null) => {
		setCurrentUser(nextUser);
	}, []);

  // Função de logout temporariamente "offline" {NÃO TIRAR}
	// const logout = useCallback(() => {
	// 	setUserState(null);
	// }, []);

	return (
    <UserContext.Provider value={{ currentUser, setUser, authReady }}>
			{children}
	  </UserContext.Provider>
	);
};

const useUserContext = () => useContext(UserContext);

export { UserProvider, useUserContext };