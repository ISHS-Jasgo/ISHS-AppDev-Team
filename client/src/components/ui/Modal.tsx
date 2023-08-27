'use client';

import { X } from 'lucide-react';

interface ModalProps {
  children: React.ReactNode;
  modalCloser: () => void;
}

export default function Modal({ children, modalCloser }: ModalProps) {
  return (
    <div onClick={modalCloser} className="fixed inset-0 z-10 bg-zinc-900/20">
      <div className="mx-auto flex h-full max-w-lg items-center">
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative h-fit w-full rounded-lg bg-white px-2 py-20"
        >
          <div className="absolute right-4 top-4">
            <button
              onClick={modalCloser}
              className="z-20 flex h-6 w-6 items-center justify-center rounded-md bg-gray-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
