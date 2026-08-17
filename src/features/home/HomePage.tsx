import { Banner } from "./components/Banner";
import { Contact } from "./components/Contact";
import { ParallaxSection } from "./components/ParallaxSection";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";

export const HomePage = () => {
  return (
    <>
      <Banner />
      <ParallaxSection offset={30}>
        <Skills />
      </ParallaxSection>
      <ParallaxSection offset={40}>
        <Projects />
      </ParallaxSection>
      <Contact />
    </>
  );
};
