import Image from 'next/image';
import ISHS1 from '@/images/main/ISHS1.jpg';
import logISHSMC from '@/images/main/logISHSMC.png';
import MealList from '@/components/page/MealList';

function MainBlock() {
  return (
    <div className="h-full w-full flex flex-col justify-center">
      <div className="h-full w-full gap-6 flex">
        <Image src={ISHS1} alt="logo" className="h-full w-auto rounded-sm" />
        <div className="w-72 grow md:grow-0">
          <MealList />
        </div>
        <div className="mx-6 3xl:mx-10 w-28 xl:flex shrink-0 hidden flex-col justify-center">
          <Image src={logISHSMC} alt="logo" className="h-auto w-full" />
        </div>
        <div className="bg-blue-200 md:block hidden grow basis-60 md:shrink-0">
          asdf
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div className="flex flex-col flex-1 gap-7 max-w-[110rem]">
      <div className="3xl:h-80 2xl:h-72 lg:h-60 h-52">
        <MainBlock />
      </div>
      <div className="h-80 bg-blue-300">블럭2</div>
      <div className=" bg-yellow-500 h-36 ">블럭3</div>
    </div>
  );
}
