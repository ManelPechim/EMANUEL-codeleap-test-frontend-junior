import Button from "./ui/button";
import Modal from "./ui/modal";
import ModalBackground from "./ui/modal-background";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import useDeletePost from "../api/delete-post";
import { useUserContext } from "../context/UserContext";

type DeleteModalProps = {
  onClose: () => void;
  onSaved: () => Promise<void> | void;
};

export default function DeleteModal ({onClose, onSaved}: DeleteModalProps) {

  const [loading, setLoading] = useState(false)
  const { deleteUserPost } = useDeletePost()
  const { currentUser, setUser } = useUserContext();

  const closeModal = () => onClose();

  const handleDeletePost = async () => {
    if (!currentUser?.username) return;

    try {
      setLoading(true)
      const updatedUserPost = await deleteUserPost({ username: currentUser.username })
      setUser(updatedUserPost)
      await onSaved();

    } catch (err) {
      console.log('Failed to delete post: ', err)
      return;
      
    } finally {
      setLoading(false);
    }

    closeModal();
  };

  return (
    <ModalBackground>
      <Modal className="h-[146px]! space-y-8">
        <header className="font-bold text-[22px]">Are you sure you want to delete this item?</header>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            className="w-[120px] w-[32px] enabled:bg-white! text- text-black! border cursor-pointer"
            onClick={closeModal}
          > Cancel </Button>

          <Button
            type="button"
            disabled={loading}
            className="flex justify-center items-center w-[120px] w-[32px] enabled:bg-[#FF5151]! cursor-pointer"
            onClick={handleDeletePost}
          > {loading ? (<Loader2 className=" size-5  animate-spin rounded-full" /> 
            ) : (<p>Delete</p>)} 
          </Button>
        </div>
      </Modal>
    </ModalBackground>
  );
};