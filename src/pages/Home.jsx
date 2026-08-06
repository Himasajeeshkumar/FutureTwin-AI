import Hero from "../components/Hero";
import FeatureCards from "../components/FeatureCards";
import Stats from "../components/Stats";
import About from "./About";
import Momentum from "./Momentum";
import Workflow from "../components/Workflow";
import Footer from "../components/Footer";

function Home() {

    return (
        <>
            <section id="home">
                <Hero />
            </section>

            <section id="features">
                <FeatureCards />
            </section>

            <section id="about">
                <About />
            </section>

            <section id="workflow">
                <Workflow />
            </section>

            <section id="stats">
                <Stats />
            </section>

            <section id="momentum">
                <Momentum />
            </section>
            <Footer />
        </>
    );
}

export default Home;