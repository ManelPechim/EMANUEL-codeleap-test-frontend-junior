import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { Edit } from '@boxicons/react'
import useGetUsers from "../../api/get-users";
import type { User } from "../../types/user";
import { useUserContext } from "../../context/UserContext";
import EditModal from "../../components/EditPostModal";
import DeleteModal from "../../components/DeletePostModal";

interface CreatedPostData {
  username: string
  title: string
  content: string
  created_datetime: string
};

type PostsProps = {
  postsData: CreatedPostData[]
}

export default function ListPosts ({ postsData }: PostsProps) {
  const [postsMap, setPostsMap] = useState<CreatedPostData[]>([]);
  const { getUsers } = useGetUsers();

  const [isEditing, setEditing] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const { currentUser } = useUserContext();

  const loadAllPosts = async () => {
    try {
      const users = await getUsers();
      const mappedPosts = users
        .filter((actualUser: User) => (actualUser.title && actualUser.content))
        .map((actualUser: User) => ({
          username: actualUser.username,
          title: actualUser.title,
          content: actualUser.content,
          created_datetime: actualUser.created_datetime
        }))
        .sort((a, b) => new Date(b.created_datetime).getTime() - new Date(a.created_datetime).getTime());

      setPostsMap(mappedPosts);
    } catch {
      setPostsMap([]);
    };
  };

  useEffect(() => {
    loadAllPosts();
  }, [getUsers, postsData]);

  const formatToMinutes = (datetime: string) => {
    const createdTime = new Date(datetime);
    const now = new Date();

    if (Number.isNaN(createdTime.getTime())) return "0 minutes ago";

    const diffInMinutes = Math.max(
      0,
      Math.floor((now.getTime() - createdTime.getTime()) / 60000)
    );

    return `${diffInMinutes} minutes ago`;
  };

  return (
    <>
      <main className="flex flex-col items-center gap-6 mb-6">
        {postsMap.map((Post, index) => (
          <section key={index} className="max-w-[752px] max-h-[316px] wrap-break-word text-wrap">        
            <header className="flex overflow-hidden max-w-[752px] max-h-[70px] items-center justify-between py-4 px-6 bg-primary rounded-t-2xl">
              <h1 className=" w-full h-full max-w-[500px] items-center text-white font-semibold text-[22px] ">
                {Post.title}
              </h1>
              <aside className="flex items-center text-white gap-6">
                {currentUser?.username === Post.username && 
                <>
                  <button 
                    type="button"
                    className="hover:scale-105 transition hover:text-red-600"
                    onClick={() => setDeleting(true)}
                  >
                    <MdDeleteForever className="w-[31.2px] h-[30px]"/>
                  </button>
                  
                  <button 
                    type="button"
                    className="hover:scale-105 hover:text-yellow-400 transition"
                    onClick={() => setEditing(true)}
                  >
                  <Edit className="w-[29px] h-[30px]"/>
                  </button>
                  </>
                }
              </aside>
            </header>
            <div key={index} className="w-[752px] h-[246px] bg-white border border-t-0 border-[#999999] rounded-2xl rounded-t-none">
              <div className="flex flex-col py-4 px-6 text-[18px] gap-4">
                <h2 className="flex justify-between text-[#777777] font-bold">
                  <p>@{Post.username}</p>
                  <p className="font-normal">{formatToMinutes(Post.created_datetime)}</p>
                </h2>
                <h2>{Post.content}</h2>
              </div>
              
            </div>
          </section>
        ))}
        
        {isEditing && (
          <EditModal
            onClose={() => setEditing(false)}
            onSaved={loadAllPosts}
          />
        )}

        {isDeleting && (
          <DeleteModal 
            onClose={() => setDeleting(false)}
            onSaved={loadAllPosts}
          />
        )}
      </main>
    </>
  );
}