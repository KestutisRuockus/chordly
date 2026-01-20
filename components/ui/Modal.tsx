"use client";

import { X } from "lucide-react";

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
        className="w-fit min-w-lg rounded-lg bg-white p-8"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>

          <button
            onClick={onClose}
            className="rounded border px-2 py-1"
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
