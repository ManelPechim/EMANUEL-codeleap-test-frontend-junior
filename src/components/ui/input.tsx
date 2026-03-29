import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string,
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={`py-1.5 px-2 text-sm text-black placeholder:text-[#CCCCCC] border rounded-lg border-[#777777] ${className ?? ""}`}
      {...props}
    />
  );
});

export default Input;