import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CreatePosts from "./CreatePosts";
import { useUserContext } from "../../context/UserContext";
import useGetUsers from "../../api/get-users";

export default function MainScreen () {
  const { currentUser, setUser, authReady } = useUserContext();
  const { getUsersParams } = useGetUsers();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const validateUser = async() => {
    if (!currentUser?.username) {
      setShouldRedirect(true);
      return;
    }

    try {
      {/*const existingUser = */} await getUsersParams({ username: currentUser.username });
      // const compare = user?.username === existingUser.username
    } catch (err){
      localStorage.removeItem("local.auth.user");
      setUser(null);
      setShouldRedirect(true);
      console.log("Failed to auth user: ", err)
    };
  };

  useEffect(() => {
    if (!authReady) return;
    validateUser();

    const interval = window.setInterval(() => {
      validateUser();
    }, 5000);

    return () => { window.clearInterval(interval) };
  }, [authReady, currentUser?.username, getUsersParams]);

  if (!authReady) return null;

  if (shouldRedirect || !currentUser?.username) return <Navigate to="/" replace />;

  return (
    <div className="flex flex-col justify-self-center items-center bg-white max-w-200 w-full">
      <CreatePosts />
    </div>
  );
};