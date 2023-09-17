import Image from 'next/image';
import Link from 'next/link';
import logISHS from '@/images/main/logISHS.png';
import mainLogo from '@/images/main/mainLogo.jpg';
import SearchBar from './SearchBar';
import Ddate from './Dday';
import RegisterBtn from './RegisterBtn';
import Modal from '../ui/Modal';
import AuthModal from '../auth/AuthModal';

export default function Header() {
  return (
    <div className="flex flex-col 3xl:h-32 xl:h-28 h-24 justify-center grow-0">
      <div className="flex h-full justify-between px-3">
        <div className="basis-1/3 3xl:py-5 xl:py-[1.15rem] py-[0.9rem] shrink-0 grow">
          <div className="flex md:justify-center gap-3 h-full">
            <Link href="/main">
              <Image src={mainLogo} alt="logo" className="h-full w-auto" />
            </Link>
            <Link href="/main" className="my-1">
              <Image src={logISHS} alt="logo" className="h-full w-auto" />
            </Link>
          </div>
        </div>
        <div className="xl:basis-1/3 basis-3/4 flex-col justify-center px-3 hidden md:flex ">
          <div className="flex justify-center">
            <SearchBar />
          </div>
        </div>
        <div className="flex basis-1/3 px-3 flex-row-reverse w-fit">
          <RegisterBtn />
          <Ddate />
        </div>
      </div>
      <div className="absolute top-2 right-2"></div>
      <Modal>
        <AuthModal />
      </Modal>
    </div>
  );
}
