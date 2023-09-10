import Footer from '@/components/page/Footer';

export default function Page() {
  return (
    <div className="flex flex-col flex-1 gap-7 max-w-[110rem]">
      <div className="basis-[26rem] flex-1 bg-slate-600">블럭1</div>
      <div className="basis-80 flex-1 bg-green-500">블럭2</div>
      <div className=" bg-yellow-500 basis-36 ">블럭3</div>
    </div>
  );
}
