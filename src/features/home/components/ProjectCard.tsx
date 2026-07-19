import { Col } from "react-bootstrap";
import type { Project } from "../../../types/project";
import "./styles/projectcard.css";

export const ProjectCard = ({ title, description, imgUrl, linkUrl }: Project) => {
  return (
    <Col xs={12} sm={6} md={4} data-aos="flip-left">
      <a href={linkUrl} target="_blank" rel="noopener noreferrer">
        <div className="proj-imgbx">
          <img src={imgUrl} alt="Project" />
          <div className="proj-txtx">
            <h4>{title}</h4>
            <div>{description}</div>
          </div>
        </div>
      </a>
    </Col>
  );
};
