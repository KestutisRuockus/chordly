"use client";

import { X } from "lucide-react";
import SubHeading from "./SubHeading";

type Props = {
  title: string;
  onClose: () => void;
  children: React.ReactNode;

  closeOnOverlayClick?: boolean;
};

const Modal = ({
  title,
  onClose,
  children,
  closeOnOverlayClick = true,
}: Props) => {
  return (
    <div
      onClick={closeOnOverlayClick ? onClose : undefined}
      className="fixed inset-0 z-50 grid place-items-center bg-black/50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-fit min-w-lg rounded-lg bg-card text-foreground p-2 sm:p-8"
      >
        <div className="flex items-center justify-between bg-secondary shadow-md p-2 rounded-md">
          <SubHeading subHeading={title} textCentered={false} />
          <button
            onClick={onClose}
            className="rounded border px-2 py-1 bg-destructive/70 text-foreground hover:bg-destructive/30 hover:text-destructive transition-colors duration-300"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
