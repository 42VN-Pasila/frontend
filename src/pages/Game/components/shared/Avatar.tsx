interface AvatarProps extends React.ComponentPropsWithoutRef<"div"> {
  src?: string;
  alt: string;
  isSelected?: boolean;
}

const Avatar = ({ src, alt, isSelected, className = "", ...props }: AvatarProps) => (
  <div
    {...props}
    className={`w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden bg-slate-700 transition-all duration-300 border-2 
    ${isSelected ? "border-(--color-primary) ring-4 ring-(--color-primary) scale-110" : "border-transparent opacity-50 group-hover:opacity-100"} 
    ${className}`}
  >
    {src && <img src={src} alt={alt} className="w-full h-full object-cover object-top" />}
  </div>
);

export default Avatar;