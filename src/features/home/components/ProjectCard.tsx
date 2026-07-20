import { Col } from "react-bootstrap";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import type { Project } from "../../../types/project";
import "./styles/projectcard.css";

export const ProjectCard = ({
  title,
  description,
  imgUrl,
  linkUrl,
}: Project) => {
  return (
    <Col xs={12} sm={6} md={4} data-aos="fade-up">
      <a
        className="proj-card"
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="proj-imgbx">
          <img src={imgUrl} alt={title} loading="lazy" />
        </div>
        <div className="proj-body">
          <h4>{title}</h4>
          <p>{description}</p>
          <span className="proj-link">
            View Project <FaArrowUpRightFromSquare />
          </span>
        </div>
      </a>
    </Col>
  );
};
