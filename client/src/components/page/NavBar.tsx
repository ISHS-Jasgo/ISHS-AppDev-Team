import Header from './Header';
import Navigation from './Navigation';

export default function NavBar() {
  return (
    <div className="flex flex-col ">
      <Header />
      <Navigation />
    </div>
  );
}
