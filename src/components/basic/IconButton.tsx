import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  active?: boolean;
}

const IconButton: React.FC<ButtonProps> = ({
  children,
  className,
  active,
  ...props
}) => {
  return (
    <button
      {...props}
      className={twMerge(
        "bg-stone-200/25 hover:bg-stone-200/75 text-stone-900 font-bold p-1 rounded-full duration-200",
        "w-8 h-8 flex justify-center items-center",
        "disabled:opacity-50 disabled:bg-stone-300/0 ",
        active && "bg-stone-200/100",
        className
      )}
    >
      {children}
    </button>
  );
};

export default IconButton;
