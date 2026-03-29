import Button from "./ui/button";
import { createPortal } from "react-dom";
import Input from "./ui/input";
import { useForm } from "react-hook-form";
import usePatchPosts from "../api/patch-post";
import { useUserContext } from "../context/UserContext";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import Modal from "./ui/modal";

type EditModalProps = {
  onClose: () => void;
  onSaved: () => Promise<void> | void;
};

type EditFormData = {
  title: string,
  content: string,
  created_datetime: string
}

export default function EditModal ({ onClose, onSaved }: EditModalProps) {

  const { currentUser, setUser } = useUserContext();
  const { patchUserPost } = usePatchPosts();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid }
  } = useForm<EditFormData>({
    defaultValues: {
      title: currentUser?.title,
      content: currentUser?.content
    }
  });

  useEffect(() => {
    reset({
      title: currentUser?.title ?? "",
      content: currentUser?.content ?? "",
      created_datetime: currentUser?.created_datetime ?? ""
    });
  }, [currentUser, reset]);

  const closeModal = () => onClose();

  const handleEditPost = async (data: EditFormData ) => {
    if(!currentUser?.username) return;

    const editPost = {
      username: currentUser?.username,
      title: data.title,
      content: data.content,
      created_datetime: data.created_datetime
    };
    try {
      setLoading(true)
      const updatedUserPost = await patchUserPost(editPost);
      setUser(updatedUserPost);
      await onSaved();

    } catch (err) {
      console.error("Failed to update post", err);
      return;

    } finally {
      setLoading(false);
    };
    
    closeModal();
  }

  return (
    <>
      {
        createPortal (
          <Modal>
            <header className="flex items-center text-[22px] font-bold mb-5">Edit item</header>

            <form onSubmit={handleSubmit(handleEditPost)} className="flex flex-col gap-6">
              <label className="flex flex-col gap-2 text-base">
                Title
                <Input
                  placeholder="Hello world"
                  className="text-sm"
                  {...register('title', {required: true})}
                />
              </label>

              <label className="flex flex-col gap-2 text-base">
                Content
                <Input
                  placeholder="Content here"
                  className="pb-10"
                  {...register('content', {required: true})}
                />
              </label>

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  className="w-[120px] w-[32px] enabled:bg-white! text- text-black! border cursor-pointer"
                  onClick={closeModal}
                > Cancel </Button>

                <Button
                  type="submit"
                  disabled={!isValid || loading}
                  className="flex justify-center items-center w-[120px] w-[32px] enabled:bg-[#47B960]! cursor-pointer"
                > 
                  {loading ? (
                    <Loader2 className=" size-5  animate-spin rounded-full" /> 
                  ) : (
                    <p>Save</p>
                  )} 
                </Button>
              </div>
            </form>          
          </Modal>,
        document.body
        )
      }
      
    </>
    );
}