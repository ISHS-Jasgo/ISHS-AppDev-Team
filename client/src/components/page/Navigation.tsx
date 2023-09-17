import Link from 'next/link';

export default function Navigation() {
  return (
    <div className="bg-blue-500 2xl:h-10 xl:h-9 h-8 flex flex-col justify-center">
      <div className="flex justify-center gap-10 text-white md:text-base text-sm">
        <Link href="/info">학교 소개</Link>
        <Link href="/knowledge">지식 in곽</Link>
        <Link href="/calendar">학교 일정</Link>
        <Link href="/learning">학습 자료</Link>
        <Link href="/nostudy">면불 신청</Link>
        <Link href="/club">동아리 리그전</Link>
        <Link href="/bigbang">빅뱅</Link>
      </div>
    </div>
  );
}
