import LoginButton from "@/components/LoginButton";

export default function Home() {
  return (
    <div>
      <div className="h-screen max-w-screen-sm mx-auto flex flex-col items-center justify-center gap-10">
        <div className="w-full flex items-center justify-between p-5  text-3xl font-bold">
          <LetterWithShadow letter="Z" />
          <LetterWithShadow letter="E" />
          <LetterWithShadow letter="U" />
          <LetterWithShadow letter="M" />
        </div>

        <LoginButton navigateOnLoggedIn="/my-lobby" />
      </div>
    </div>
  );
}


type LetterWithShadowProps = {
  letter: string;
  className?: string;
};
const LetterWithShadow: React.FC<LetterWithShadowProps> = ({ letter, className }) => {
  return (
    <div className="relative">
      <p
        className={"absolute inset-0 text-black/30 z-[-1] blur-[2px]"}
        style={{
          transform:
            "scaleY(0.5) skewX(-25deg) translateX(12px) translateY(10px)",
        }}
      >
        {letter}
      </p>
      <p className="text-gradient" >
        {letter}
      </p>
    </div>
  );
}
