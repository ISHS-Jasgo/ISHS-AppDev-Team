'use client';

import { useEffect, useState } from 'react';

interface CoolButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function CoolButton({
  children,
  className,
  onClick,
}: CoolButtonProps) {
  const [cn, setClassName] = useState(
    'w-fit px-[0.75rem] flex-grow whitespace-nowrap rounded-sm bg-blue-500 text-sm font-medium text-white'
  );

  useEffect(() => {
    if (className) {
      setClassName('w-fit px-3 flex-grow whitespace-nowrap ' + className);
    }
  }, [className]);

  return (
    <button onClick={onClick} className={cn}>
      {children}
    </button>
  );
}
