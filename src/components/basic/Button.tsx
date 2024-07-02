import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ title, className, loading, ...props }) => { 
  return (
    <button
      {...props}
      className={twMerge(
        "bg-stone-900 hover:bg-stone-700 text-stone-100 font-bold py-2 px-6 rounded-sm duration-200",
        loading && "loading",
        className
      )}
    >
      {title}
    </button>
  );
}

export default Button;