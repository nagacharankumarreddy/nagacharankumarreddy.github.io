import "animate.css";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import headerImg from "../../../assets/img/charanbw.png";

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const period = 2000;

  useEffect(() => {
    const toRotate = ["Full Stack Developer"];
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
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <span className="tagline">Welcome to my Portfolio</span>
                  <h1>{`Hi! I'm Charan`}</h1>
                  <h1
                    className="txt-rotate"
                    data-period="1000"
                    data-rotate='[ "Full Stack Developer"]'
                  >
                    <span className="wrap">{text}</span>
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
                </div>
              )}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__zoomIn" : ""
                  }
                >
                  <img src={headerImg} alt="Header Img" />
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
