interface AvatarProps extends React.ComponentPropsWithoutRef<"div"> {
  src?: string;
  alt: string;
  isSelected?: boolean;
}

const Avatar = ({ src, alt, isSelected, className = "", ...props }: AvatarProps) => (
  <div
    {...props}
    className={`w-16 h-16 md:w-35 md:h-35 rounded-full overflow-hidden transition-all duration-300 
    ${isSelected ? "bg-rave-red ring-4 ring-rave-red scale-110" : "bg-rave-white "} 
    ${className}`}
  >
    {src && <img src={src} alt={alt} className="w-full h-full object-cover object-top" />}
  </div>
);

export default Avatar;