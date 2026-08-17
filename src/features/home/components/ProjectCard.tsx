import { motion } from "framer-motion";
import { Col } from "react-bootstrap";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import type { Project } from "../../../types/project";
import { Tilt3D } from "./Tilt3D";
import "./styles/projectcard.css";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export const ProjectCard = ({
  title,
  description,
  imgUrl,
  linkUrl,
}: Project) => {
  return (
    <Col xs={12} sm={6} md={4}>
      <motion.div
        variants={cardVariants}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <Tilt3D maxTilt={8}>
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
        </Tilt3D>
      </motion.div>
    </Col>
  );
};
