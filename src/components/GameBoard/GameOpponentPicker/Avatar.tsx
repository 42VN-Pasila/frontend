interface AvatarProps extends React.ComponentPropsWithoutRef<"div"> {
  src?: string;
  alt: string;
  isSelected?: boolean;
}

const Avatar = ({ src, alt, isSelected, className = "", ...props }: AvatarProps) => (
  <div
    {...props}
    className={`w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden bg-slate-700 transition-all duration-300 
    ${isSelected ? " ring-4 ring-(--rave-red) scale-110" : "border-transparent"} 
    ${className}`}
  >
    {src && <img src={src} alt={alt} className="w-full h-full object-cover object-top" />}
  </div>
);

export default Avatar;