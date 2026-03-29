import ModalBackground from "./modal-background";

type ModalBackGroundProps = {
  children: React.ReactNode,
  className?: string
};

export default function Modal ({ children, className }: ModalBackGroundProps) {
  return (
    <ModalBackground>
      <div className={`flex flex-col px-6 py-5 w-[660px] h-[340px] bg-white rounded-2xl ${className ?? ''}`} >
        {children}
      </div>  
    </ModalBackground>
    );
}