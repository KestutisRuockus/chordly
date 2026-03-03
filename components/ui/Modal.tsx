"use client";

import { X } from "lucide-react";
import SubHeading from "./SubHeading";
import { useEffect, useRef } from "react";

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
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    const focusableElements = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    first?.focus();
    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, []);

  return (
    <div
      onClick={closeOnOverlayClick ? onClose : undefined}
      className="fixed inset-0 z-50 grid place-items-center bg-black/50 overflow-y-auto"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ModalTitle"
        onClick={(e) => e.stopPropagation()}
        className="w-11/12 sm:w-fit min-w-lg rounded-lg bg-card text-foreground p-2 sm:p-8"
      >
        <div className="flex items-center justify-between bg-secondary shadow-md p-2 rounded-md">
          <SubHeading id="ModalTitle" subHeading={title} textCentered={false} />
          <button
            onClick={onClose}
            aria-label="Close dialog"
            type="button"
            className="rounded border px-2 py-1 bg-destructive/70 text-foreground hover:bg-destructive/30 hover:text-destructive transition-colors duration-300"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
