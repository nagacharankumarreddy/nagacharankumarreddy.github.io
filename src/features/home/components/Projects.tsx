import { motion } from "framer-motion";
import { Col, Container, Row } from "react-bootstrap";
import calculator from "../../../assets/img/calculator.png";
import colorSharp2 from "../../../assets/img/color-sharp2.png";
import dice from "../../../assets/img/dice.png";
import guess from "../../../assets/img/Guess.png";
import interest from "../../../assets/img/interest.png";
import markdown from "../../../assets/img/markdown.png";
import moviehub from "../../../assets/img/moviehub.png";
import movieupdatenotifier from "../../../assets/img/movieupdatenotifier.png";
import onlycss from "../../../assets/img/onlycss.png";
import pwdstrength from "../../../assets/img/pwdstrengthcheck.png";
import quickbite from "../../../assets/img/quickbite.png";
import strongpwd from "../../../assets/img/strongpwd.png";
import techtips from "../../../assets/img/techtips.jpg";
import tictactoe from "../../../assets/img/tictactoe.png";
import type { Project } from "../../../types/project";
import { ProjectCard } from "./ProjectCard";

const projects: Project[] = [
  {
    title: "Quick Bite 🍽️",
    description: "Online Food Ordering App",
    imgUrl: quickbite,
    linkUrl: "https://nagacharankumarreddy.github.io/quick-bite/",
  },
  {
    title: "Movie Hub 🎬",
    description: "Effortless movie filtering experience",
    imgUrl: moviehub,
    linkUrl: "https://nagacharankumarreddy.github.io/movie-hub/",
  },
  {
    title: "Movie Update Notifier 🎬",
    description: "BackEnd Service, UI not available",
    imgUrl: movieupdatenotifier,
    linkUrl: "https://movie-update-notifier.onrender.com/movies/",
  },
  {
    title: "Calculator 🧮",
    description: "Tool for Quick calculation",
    imgUrl: calculator,
    linkUrl: "https://nagacharankumarreddy.github.io/calculator/",
  },
  {
    title: "Tech Tips 💡",
    description: "Make your TechLife Easy",
    imgUrl: techtips,
    linkUrl: "https://nagacharankumarreddy.github.io/tech-tips/",
  },
  {
    title: "Tic-Tac-Toe ❌⭕",
    description: "Two-player Game",
    imgUrl: tictactoe,
    linkUrl: "https://nagacharankumarreddy.github.io/tictactoe/",
  },
  {
    title: "Responsive Website 📱",
    description: "Only using CSS",
    imgUrl: onlycss,
    linkUrl: "https://nagacharankumarreddy.github.io/Only-CSS/",
  },
  {
    title: "Mark-Down Editor ✍️",
    description: "Text Formatting",
    imgUrl: markdown,
    linkUrl: "https://nagacharankumarreddy.github.io/mark-down-editor/",
  },
  {
    title: "Guess the Number 🔢",
    description: "Number guessing game",
    imgUrl: guess,
    linkUrl: "https://nagacharankumarreddy.github.io/Guess-The-Number/",
  },
  {
    title: "Interest Calculator 📈",
    description: "Helps to Calculate interest",
    imgUrl: interest,
    linkUrl: "https://nagacharankumarreddy.github.io/interest-calculator/",
  },
  {
    title: "Dice Game 🎲",
    description: "Fun game",
    imgUrl: dice,
    linkUrl: "https://nagacharankumarreddy.github.io/dice-game/",
  },
  {
    title: "Password Strength Check 🔒",
    description: "Password Strength Check",
    imgUrl: pwdstrength,
    linkUrl:
      "https://nagacharankumarreddy.github.io/password-strength-checker/",
  },
  {
    title: "Strong Password Generator 🔑",
    description: "Generate Strong Password",
    imgUrl: strongpwd,
    linkUrl:
      "https://nagacharankumarreddy.github.io/generate-strong-password/",
  },
];

export const Projects = () => {
  return (
    <section className="project" id="project">
      <Container>
        <Row>
          <Col size={12}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              Projects
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            >
              A selection of things I've built
            </motion.p>
            <Row
              as={motion.div}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } },
              }}
            >
              {projects.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
      <img
        className="background-image-right"
        src={colorSharp2}
        alt="background"
      />
    </section>
  );
};
