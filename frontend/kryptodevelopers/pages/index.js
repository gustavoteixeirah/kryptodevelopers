import Base from '../components/Base';
import NavBar from '../components/NavBar';
import Title from '../components/Title';
import Description from '../components/Description';
import Roadmap from '../components/Roadmap';
import Team from '../components/Team';

export default function Home() {
  return (
    <Base>
      <NavBar />
      <Title />
      <Description />
      {/* <Roadmap /> */}
      <Team />
    </Base>
  );
}
