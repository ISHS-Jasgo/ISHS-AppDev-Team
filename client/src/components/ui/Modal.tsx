'use client';

import { modalStateAtom } from '@/recoil/modal';
import { X } from 'lucide-react';
import { MouseEvent, useCallback, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';

interface ModalProps {
  children: React.ReactNode;
}

export default function Modal({ children }: ModalProps) {
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalStateAtom);

  const outsideRef = useRef(null);

  const modalCloser = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      // 내부 클릭 시 모달 닫힘 방지
      if (e.target === outsideRef.current) setIsModalOpen(false);
    },
    [setIsModalOpen]
  );

  useEffect(() => {
    return () => {
      setIsModalOpen(false);
    };
  }, [setIsModalOpen]);

  return (
    isModalOpen && (
      <div
        onClick={modalCloser}
        ref={outsideRef}
        className="fixed inset-0 z-40 bg-zinc-900/40 flex justify-center items-center"
      >
        <div className="mx-28 md:mx-32 lg:mx-0 max-w-xl w-full">
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative h-fit w-full rounded-lg bg-white px-2 py-12"
          >
            <div className="absolute right-4 top-4">
              <div
                onClick={() => setIsModalOpen(false)}
                className="flex h-6 w-6 z-50 items-center hover:cursor-pointer justify-center rounded-md bg-gray-200"
              >
                <X className="h-4 w-4" />
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    )
  );
}
