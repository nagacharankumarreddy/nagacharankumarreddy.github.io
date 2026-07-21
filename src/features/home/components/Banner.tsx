import "animate.css";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  FaArrowRight,
  FaEnvelope,
  FaFileDownload,
  FaGithub,
  FaLinkedinIn,
  FaPhoneAlt,
} from "react-icons/fa";
import TrackVisibility from "react-on-screen";
import { HashLink } from "react-router-hash-link";
import headerImg from "../../../assets/img/charanbw.png";
import { useMagneticButton } from "../../cursor/useMagneticButton";

export const Banner = () => {
  const magneticRef = useMagneticButton<HTMLAnchorElement>();
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const period = 2000;

  useEffect(() => {
    const toRotate = ["Developer"];
    const tick = () => {
      const i = loopNum % toRotate.length;
      const fullText = toRotate[i];
      const updatedText = isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1);

      setText(updatedText);

      if (isDeleting) {
        setDelta((prevDelta) => prevDelta / 2);
      }

      if (!isDeleting && updatedText === fullText) {
        setIsDeleting(true);
        setDelta(period);
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setDelta(500);
      }
    };

    const ticker = setInterval(tick, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [loopNum, isDeleting, text, delta]);

  return (
    <section className="banner" id="home">
      <Container style={{ marginTop: "-70px" }}>
        <Row className="aligh-items-center">
          <Col xs={12} lg={8} xl={7} md={7}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <span className="tagline"> 👋 Welcome </span>
                  <h2>{`Hi! I'm Charan`}</h2>
                  <h1
                    className="txt-rotate"
                    data-period="1000"
                    data-rotate='[ "Full Stack Developer"]'
                  >
                    Full Stack
                    <br />
                    <span className="wrap gradient-text">{text}</span>
                  </h1>
                  <p>
                    I'm a passionate full-stack developer driven by curiosity
                    and a relentless desire for growth. I thrive in dynamic
                    environments where I can tackle complex challenges,
                    contribute to innovative projects, and stay at the forefront
                    of modern technologies. With a strong design mindset and
                    attention to detail, I continuously refine my skills to
                    deliver impactful, user-focused solutions.
                  </p>
                  <div className="banner-actions">
                    <HashLink to="/#project" className="btn-gradient" ref={magneticRef}>
                      <span>View Projects</span>
                      <FaArrowRight />
                    </HashLink>
                    <a
                      href="/Naga_Charan_Full_Stack_Dev.pdf"
                      download
                      className="btn-outline"
                    >
                      <FaFileDownload />
                      <span>Download Resume</span>
                    </a>
                  </div>
                  <div className="banner-connect">
                    <span className="banner-connect-label">Let's connect</span>
                    <div className="banner-social">
                      <a
                        href="https://www.linkedin.com/in/naga-charan-kumar-reddy-11378616a/"
                        target="blank"
                        aria-label="LinkedIn"
                      >
                        <FaLinkedinIn />
                      </a>
                      <a
                        href="https://github.com/nagacharankumarreddy/"
                        target="blank"
                        aria-label="GitHub"
                      >
                        <FaGithub />
                      </a>
                      <a
                        href="mailto:nagacharankumarreddy@gmail.com"
                        target="blank"
                        aria-label="Email"
                      >
                        <FaEnvelope />
                      </a>
                      <a href="tel:8309340949" target="blank" aria-label="Phone">
                        <FaPhoneAlt />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={5} xl={5} className="banner-img-col">
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__zoomIn" : ""
                  }
                >
                  <img src={headerImg} alt="Charan" className="banner-img" />
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
