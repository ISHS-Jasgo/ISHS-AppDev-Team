import Footer from '@/components/page/Footer';
import NavBar from '@/components/page/NavBar';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="flex flex-col">
      <NavBar />
      <div className="py-6 flex justify-center 2xl:px-44 xl:px-32 lg:px-8 px-4 h-full">
        {children}
      </div>
      <Footer />
    </div>
  );
}
