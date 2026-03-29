type ModalBackgroundProps = {
  children: React.ReactNode,
  className?: string
};

export default function ModalBackground ({ children, className }: ModalBackgroundProps) {
  return (
    <main className={`flex fixed inset-0 items-center justify-center bg-black/50 text-black ${className ?? ''}`}>
      {children}
    </main>
  );
};