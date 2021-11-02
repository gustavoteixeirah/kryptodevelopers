import NavBar from '../components/NavBar';
import Title from '../components/Title';
import Description from '../components/Description';
import Roadmap from '../components/Roadmap';
import Team from '../components/Team';

export default function Home() {
  return (
    <div className="min-w-screen min-h-screen text-white font-poppins" style={{ backgroundColor: '#111827' }}>
      <NavBar />
      <Title />
      <Description />
      {/* <Roadmap /> */}
      <Team />
    </div>
  );
}
