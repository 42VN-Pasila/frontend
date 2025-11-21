import React from "react";

interface FloatingInfoPanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const FloatingInfoPanel: React.FC<FloatingInfoPanelProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none"
      onClick={onClose}
    >
      <div
        className="
          absolute top-6 right-6
          w-[320px] max-w-[80vw]
          rounded-2xl
          bg-[#05050A]/95
          border border-white/10
          shadow-[0_18px_45px_rgba(0,0,0,0.65)]
          backdrop-blur-md
          text-[#F5F3F2]
          pointer-events-auto
          overflow-hidden
          animate-[fadeIn_0.18s_ease-out]
        "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1 w-full bg-gradient-to-r from-[#FF5F24] via-[#FF9F6B] to-[#FFD8B2]" />

        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-sm font-semibold tracking-[0.12em] uppercase text-white/80">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="
                text-xs
                bg-white/5
                border border-white/15
                rounded-full
                px-2.5 py-1
                hover:bg-white/10 hover:border-white/40
                transition
              "
            >
              Close
            </button>
          </div>

          <div className="mt-3 text-xs leading-relaxed text-white/80">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingInfoPanel;
