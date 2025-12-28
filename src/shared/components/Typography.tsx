// import React from "react";

// type TypographyVariant = "h1" | "h2" | "body" | "caption";

// const TYPOGRAPHY_VARIANTS: Record<TypographyVariant, string> = {
//   h1: "text-4xl font-chakraBold tracking-tight",
//   h2: "text-2xl font-chakraBold",
//   body: "text-xl font-chakraRegular",
//   caption: "text-sm font-chakraRegular",
// }

// export interface TypographyProps {
//   variant: TypographyVariant;
//   as?: React.ElementType;
//   className?: string;
//   children: React.ReactNode;
// }

// export const Typography = ({
//   variant,
//   as: Component = "span",
//   className,
//   children,
// }): TypographyProps => {
//   const composedClassName = `${TYPOGRAPHY_VARIANTS[variant]}${className ? ` ${className}` : ""}`;

//   return (
//     <Component className={composedClassName}>
//       {children}
//     </Component>
//   );
// };

// export default Typography;