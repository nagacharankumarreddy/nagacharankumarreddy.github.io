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

const categories: SkillCategory[] = [
  {
    title: "Development",
    skills: [
      { icon: <FaHtml5 color="#E44D26" />, name: "HTML" },
      { icon: <FaCss3Alt color="#1572B6" />, name: "CSS" },
      { icon: <FaJs color="#F7DF1E" />, name: "JavaScript" },
      { icon: <FaReact color="#61DAFB" />, name: "ReactJs" },
      { icon: <SiRedux color="#764ABC" />, name: "Redux" },
      { icon: <FaNodeJs color="#339933" />, name: "Node.js" },
    ],
  },
  {
    title: "Database",
    skills: [
      { icon: <FaDatabase color="#4479A1" />, name: "MySQL" },
      { icon: <SiMongodb color="#4DB33D" />, name: "MongoDB" },
      { icon: <SiFirebase color="#FFCA28" />, name: "Firebase" },
      { icon: <SiElasticsearch color="#005571" />, name: "Elasticsearch" },
    ],
  },
  {
    title: "DevOps",
    skills: [
      { icon: <TbBrandAzure color="#0089D6" />, name: "Azure Pipelines" },
      { icon: <SiDocker color="#2496ED" />, name: "Docker" },
      { icon: <SiKubernetes color="#326CE5" />, name: "Kubernetes" },
      { icon: <SiGithubactions color="#2088FF" />, name: "GitHub Actions" },
    ],
  },
];

export const Skills = () => {
  return (
    <section className="skill" id="skills">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="skill-header">
              <h2>Skills</h2>
              <p>Technologies and tools I work with</p>
            </div>
            <div className="skill-categories">
              {categories.map((category) => (
                <div key={category.title} className="category">
                  <h3>{category.title}</h3>
                  <div className="skill-grid">
                    {category.skills.map((skill) => (
                      <div className="skill-card" key={skill.name}>
                        <div className="skill-icon">{skill.icon}</div>
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
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
