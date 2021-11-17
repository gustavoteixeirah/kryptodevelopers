import Base from '../components/Base';
import Description from '../components/Description';
import Roadmap from '../components/Roadmap';
import NavBar from '../components/NavBar';
import Team from '../components/Team';
import Title from '../components/Title';
import Footer from '../components/Footer';

export default function Home() {
    return (
        <Base>
            <NavBar />
            <Title />
            <Description />
            <Roadmap />
            <Team />
            <Footer />
        </Base>
    );
}
