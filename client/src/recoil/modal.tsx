import { atom } from 'recoil';

type ModalType = 'signin' | 'signup' | false;

export const modalStateAtom = atom<ModalType>({
  key: 'modalState',
  default: false,
});
