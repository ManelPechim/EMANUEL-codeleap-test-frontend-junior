import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ListPosts from "../../pages/main-screen/ListPosts";
import Button from "../../components/ui/button";
import Input from "../../components/ui/input";
import { useUserContext } from "../../context/UserContext";
import usePatchPosts from "../../api/patch-post";

interface CreatePostData {
  username: string
  title: string
  content: string
  created_datetime: string
};

export default function CreatePost () {
  
  const { currentUser, setUser } = useUserContext();
  const [ posts, createPost ] = useState<CreatePostData[]>([]);
  const [ postExists, setPostExists ] = useState(false);

  const { patchUserPost } = usePatchPosts();
  
  const {
    register,
    handleSubmit,
    resetField,
    formState: { isValid },
    
  } = useForm<CreatePostData>();

  const submitPost = async (data: CreatePostData) => {
    if(!currentUser?.username || postExists) return;

    const newPost: CreatePostData = {
      username: currentUser?.username,
      title: data.title,
      content: data.content,
      created_datetime: data.created_datetime
    }; 
    try {
      const updatedUserPost = await patchUserPost(newPost);
      setUser(updatedUserPost);
    } catch (err) {
      console.error("Failed to create post", err);
      return;
    };
    resetField('title')
    resetField('content')
    createPost((prevPost) => [...prevPost, newPost]);
    setPostExists(true);
  };

  useEffect(() => {  
    if (!currentUser?.username) {
      setPostExists(false);
      return;
    }
    const alreadyHasPost = Boolean(currentUser.title?.trim() && currentUser.content?.trim());
    setPostExists(alreadyHasPost);
  }, [currentUser?.username, currentUser?.title, currentUser?.content]);

  return (
    <>
      <main className="max-w-[800px] w-full">
        <header className="flex items-center py-4 px-8 bg-primary text-white ">
          <h1 className="font-semibold text-[22px]">
            CodeLeap Network
          </h1>
        </header>

        <form className="p-[24px]" onSubmit={handleSubmit(submitPost)}>
          <div className="flex flex-col gap-4 p-4 border border-[#999999] rounded-2xl">
            <h2 className="font-bold text-[22px]">What's on your mind?</h2>
            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-2 text-base">
                Title
                <Input 
                  type='text'
                  placeholder="Hello world"
                  className="disabled:cursor-not-allowed"
                  disabled={postExists}
                  {...register("title", {required: true})}
                />
              </label>
             
              <label className="flex flex-col text-base">
                Content
                <Input
                  type='text'
                  placeholder="Content here"
                  className="pb-10 disabled:cursor-not-allowed" 
                  disabled={postExists}
                  {...register("content", {required: true})}
                />
              </label>
            </div>

            <div className={`flex ${postExists ? "justify-between" : "justify-end"}`}>
              {postExists && (
                <div className="text-gray-600 opacity-30">*It is not possible to create a new post when there is already a created one</div>
              )}
              <Button
                type="submit"
                disabled={!isValid || postExists}
                className="w-[120px] h-[32px] text-sm "
              >
                Create
              </Button>
            </div>
          </div>
        </form>

        <ListPosts postsData={posts}></ListPosts>
        
      </main>
    </>
  );
}