import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useCallback, useLayoutEffect, useState } from "react";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { CurvedCarousel } from "./components/CurvedCarousel";
import { Experience } from "./components/Experience";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { Preloader } from "./components/Preloader";
import { Services } from "./components/Services";
import { WorksRing } from "./components/WorksRing";
import { ScrollTrigger, gsap, lockScroll, reducedMotion, setLenis } from "./lib/motion";
import "./styles/showcase.css";

export const ShowcasePage = () => {
  const [loaded, setLoaded] = useState(false);

  useLayoutEffect(() => {
    document.documentElement.dataset.page = "showcase";
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const lenis = reducedMotion ? null : new Lenis({ lerp: 0.1 });
    const raf = (time: number) => lenis?.raf(time * 1000);
    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    }
    setLenis(lenis);
    lockScroll(true);

    // Display fonts change text metrics, so pinned sections are measured again once they load.
    let cancelled = false;
    document.fonts.ready.then(() => !cancelled && ScrollTrigger.refresh());

    return () => {
      cancelled = true;
      gsap.ticker.remove(raf);
      lockScroll(false);
      setLenis(null);
      lenis?.destroy();
      delete document.documentElement.dataset.page;
    };
  }, []);

  const handleLoaded = useCallback(() => {
    setLoaded(true);
    lockScroll(false);
  }, []);

  return (
    <div className={`aw ${reducedMotion ? "aw-static" : ""}`}>
      {!loaded && <Preloader onDone={handleLoaded} />}
      <Navbar />
      <main>
        <div className="aw-curtain">
          <Hero ready={loaded} />
          <About />
        </div>
        <Experience />
        <CurvedCarousel />
        <WorksRing />
        <Services />
      </main>
      <Contact />
    </div>
  );
};
