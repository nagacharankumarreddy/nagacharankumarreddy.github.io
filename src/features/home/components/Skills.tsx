import type { ReactNode } from "react";
import {
  FaCss3Alt,
  FaDatabase,
  FaHtml5,
  FaJs,
  FaNodeJs,
  FaReact,
} from "react-icons/fa";
import {
  SiDocker,
  SiElasticsearch,
  SiFirebase,
  SiGithubactions,
  SiKubernetes,
  SiMongodb,
  SiRedux,
} from "react-icons/si";
import { TbBrandAzure } from "react-icons/tb";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import colorSharp from "../../../assets/img/color-sharp.png";
import "./styles/skills.css";

interface Skill {
  icon: ReactNode;
  name: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const Skills = () => {
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 2 },
  };

  const categories: SkillCategory[] = [
    {
      title: "Development",
      skills: [
        { icon: <FaHtml5 size={50} color="#E44D26" />, name: "HTML" },
        { icon: <FaCss3Alt size={50} color="#1572B6" />, name: "CSS" },
        { icon: <FaJs size={50} color="#F7DF1E" />, name: "JavaScript" },
        { icon: <FaReact size={50} color="#61DAFB" />, name: "ReactJs" },
        { icon: <SiRedux size={50} color="#764ABC" />, name: "Redux" },
        { icon: <FaNodeJs size={50} color="#339933" />, name: "Node.js" },
      ],
    },
    {
      title: "Database",
      skills: [
        { icon: <FaDatabase size={50} color="#4479A1" />, name: "MySQL" },
        { icon: <SiMongodb size={50} color="#4DB33D" />, name: "MongoDB" },
        { icon: <SiFirebase size={50} color="#FFCA28" />, name: "Firebase" },
        {
          icon: <SiElasticsearch size={50} color="#005571" />,
          name: "Elasticsearch",
        },
      ],
    },
    {
      title: "DevOps",
      skills: [
        {
          icon: <TbBrandAzure size={50} color="#0089D6" />,
          name: "Azure Pipelines",
        },
        { icon: <SiDocker size={50} color="#2496ED" />, name: "Docker" },
        {
          icon: <SiKubernetes size={50} color="#326CE5" />,
          name: "Kubernetes",
        },
        {
          icon: <SiGithubactions size={50} color="#2088FF" />,
          name: "GitHub Actions",
        },
      ],
    },
  ];

  return (
    <section className="skill" id="skills">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="skill-bx wow zoomIn">
              <h2>Skills</h2>
              {categories.map((category, index) => (
                <div key={index} className="category">
                  <h3>{category.title}</h3>
                  <Carousel
                    responsive={responsive}
                    infinite={true}
                    autoPlaySpeed={2500}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                    keyBoardControl={true}
                    autoPlay={true}
                    className="owl-carousel owl-theme skill-slider"
                  >
                    {category.skills.map((skill, idx) => (
                      <div className="item" key={idx}>
                        <div className="skill-icon">{skill.icon}</div>
                        <h5>{skill.name}</h5>
                      </div>
                    ))}
                  </Carousel>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <img
        className="background-image-left"
        src={colorSharp}
        alt="colorSharp"
      />
    </section>
  );
};
