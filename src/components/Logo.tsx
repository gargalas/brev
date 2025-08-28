import brevLogo from "/lovable-uploads/8d956fd1-d51c-41eb-88d4-fc1de188df20.png";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export const Logo = ({ size = "md", showText = true, className = "" }: LogoProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12", 
    lg: "w-16 h-16"
  };
  
  const textSizeClasses = {
    sm: "text-2xl",
    md: "text-3xl",
    lg: "text-4xl"
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img 
        src={brevLogo} 
        alt="Brev.md Logo" 
        className={`${sizeClasses[size]} object-contain`}
      />
      {showText && (
        <span className={`font-helvetica font-normal
         text-primary ${textSizeClasses[size = "lg"]}`}>
          brev.md
        </span>
      )}
    </div>
  );
};