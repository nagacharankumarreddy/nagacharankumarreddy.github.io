import { Banner } from "./components/Banner";
import { Contact } from "./components/Contact";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";

export const HomePage = () => {
  return (
    <>
      <Banner />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
};
