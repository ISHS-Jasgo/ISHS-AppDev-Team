import Image from 'next/image';
import Link from 'next/link';
import logISHS from '@/images/main/logISHS.png';
import mainLogo from '@/images/main/mainLogo.jpg';
import SearchBar from './SearchBar';
import Ddate from './Dday';

export default function Header() {
  return (
    <div className="flex flex-col md:basis-[7.5rem] basis-24 justify-center">
      <div className="flex">
        <div className="basis-1/3 flex justify-center gap-3 ">
          <div className="md:w-[85px] w-[55px]">
            <Link href="/main">
              <Image src={mainLogo} alt="logo" />
            </Link>
          </div>
          <div className="md:w-[200px] w-[150px]">
            <Link href="/main">
              <Image src={logISHS} alt="logo" />
            </Link>
          </div>
        </div>
        <div className="xl:basis-1/3 basis-2/3 flex flex-col justify-center px-3">
          <SearchBar />
        </div>
        <div className="xl:flex basis-1/3 hidden justify-center relative">
          <div className="relative right-8 top-2">
            <Ddate />
          </div>
        </div>
      </div>
      <div className="absolute flex gap-1 top-2 right-2">
        <Link href="/main/signin">로그인</Link>
        <span>/</span>
        <Link href="/main/signup">회원가입</Link>
      </div>
    </div>
  );
}
