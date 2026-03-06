import type { ComponentEmphasis, ComponentVariant } from "./types";
import { twMerge } from "tailwind-merge";


const VARIANT_EMPHASIS_CLASSES: Record<ComponentVariant, Record<ComponentEmphasis, string>> = {
    primary: {
        high: "border border-rave-red bg-rave-red text-rave-black",
        low: "border border-rave-red bg-rave-red/10 text-rave-white",
    },
    inverse: {
        high: "border border-rave-white/5 bg-rave-white/10 text-rave-white",
        low: "border border-rave-white/15 bg-rave-white/5 text-rave-white",
    }
};

type TagProps = {
    children: React.ReactNode;
    variant: ComponentVariant;
    emphasis: ComponentEmphasis;
};

export const Tag = ({ children, variant, emphasis }: TagProps) => {
    const baseClasses = "inline-flex items-center rounded-none px-3 py-2 text-xs  tracking-[0.18em]";
    const variantClasses = VARIANT_EMPHASIS_CLASSES[variant][emphasis];
    return <div className={twMerge(baseClasses, variantClasses)}>{children}</div>;
};