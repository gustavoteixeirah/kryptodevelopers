import Base from '../components/Base';
import Description from '../components/Description';
import NavBar from '../components/NavBar';
import Team from '../components/Team';
import Title from '../components/Title';

export default function Home() {
    return (
        <Base>
            <NavBar />
            <Title />
            <Description />
            {/* <Roadmap /> */}
            <Team />
            {process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production' && (
                <div className="text-xs">
                    Vercel ENV: {process.env.NEXT_PUBLIC_VERCEL_ENV}
                    <br />
                    Vercel REF: {process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF}
                    <br />
                    Commit version: {process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA}
                </div>
            )}
        </Base>
    );
}
