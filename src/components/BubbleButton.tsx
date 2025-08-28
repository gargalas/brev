import { cn } from "@/lib/utils";

interface BubbleButtonProps {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export const BubbleButton = ({ 
  children, 
  selected = false, 
  onClick, 
  className = "" 
}: BubbleButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "bubble-button",
        selected && "selected",
        className
      )}
    >
      {children}
    </button>
  );
};