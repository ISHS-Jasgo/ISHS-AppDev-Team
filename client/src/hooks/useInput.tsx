'use client';

import { useState } from 'react';

type UseInputType = [
  string,
  JSX.Element,
  React.Dispatch<React.SetStateAction<string>>
];

export default function useInput(
  placeHolder?: string,
  option?: any
): UseInputType {
  const [value, setValue] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const input = (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeHolder || ''}
      className="h-8 w-52 pl-2 rounded-sm bg-slate-100 text-sm"
      {...option}
    ></input>
  );

  return [value, input, setValue];
}
