import { cn } from "@ark-market/ui";

interface IconProps {
  icon: string; // The character code or name for the icon
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ icon, size = 'md', className }) => {
  const sizeClasses = {
    sm: 'text-sm', // 16px
    md: 'text-xl',   // 20px
    lg: 'text-2xl',  // 24px
  };

  const widthClasses = {
    sm: 'w-2', // 16px
    md: 'w-4',   // 20px
    lg: 'w-8',  // 24px
  };

  return (
    <span
      className={cn(
        "font-[50]",
        sizeClasses[size],
        widthClasses[size],
        className
      )}
      style={{ fontFamily: 'UnframedIconFont' }}
    >
      {icon}
    </span>
  );
};
