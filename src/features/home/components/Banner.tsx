import { motion } from "framer-motion";
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
import { HashLink } from "react-router-hash-link";
import headerImg from "../../../assets/img/charanbw.png";
import { useMagneticButton } from "../../cursor/useMagneticButton";
import { Tilt3D } from "./Tilt3D";

const textVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.12, duration: 0.55, ease: "easeOut" as const },
  }),
};

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
            <motion.span
              className="tagline"
              custom={0}
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              {" "}
              👋 Welcome{" "}
            </motion.span>
            <motion.h2 custom={1} variants={textVariants} initial="hidden" animate="visible">
              {`Hi! I'm Charan`}
            </motion.h2>
            <motion.h1
              className="txt-rotate"
              data-period="1000"
              data-rotate='[ "Full Stack Developer"]'
              custom={2}
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              Full Stack
              <br />
              <span className="wrap gradient-text">{text}</span>
            </motion.h1>
            <motion.p custom={3} variants={textVariants} initial="hidden" animate="visible">
              I'm a passionate full-stack developer driven by curiosity
              and a relentless desire for growth. I thrive in dynamic
              environments where I can tackle complex challenges,
              contribute to innovative projects, and stay at the forefront
              of modern technologies. With a strong design mindset and
              attention to detail, I continuously refine my skills to
              deliver impactful, user-focused solutions.
            </motion.p>
            <motion.div
              className="banner-actions"
              custom={4}
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
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
            </motion.div>
            <motion.div
              className="banner-connect"
              custom={5}
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
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
            </motion.div>
          </Col>
          <Col xs={12} md={5} xl={5} className="banner-img-col">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
            >
              <Tilt3D maxTilt={10} glare={false}>
                <img
                  src={headerImg}
                  alt="Charan"
                  className="banner-img"
                />
              </Tilt3D>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
