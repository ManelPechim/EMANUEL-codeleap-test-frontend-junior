import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{ 
  className?: string,
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, type='button', ...props }, ref) => {
  return (
    <button 
      ref={ref}
      type={type}
      className={`py-1 px-7 rounded-lg text-white font-semibold text-base transition
        enabled:bg-[#7695EC] disabled:bg-[#777777]
        disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:scale-105 ${className ?? ""}`}
      {...props}
    ></button>
  );
});

export default Button;