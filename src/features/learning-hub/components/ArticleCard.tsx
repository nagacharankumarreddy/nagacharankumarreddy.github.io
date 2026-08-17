import { Link } from "react-router-dom";
import { Tilt3D } from "../../home/components/Tilt3D";
import type { LearningHubArticle } from "../../../types/learningHub";

export const ArticleCard = ({ title, description, categorySlug, url }: LearningHubArticle) => {
  return (
    <Tilt3D maxTilt={6}>
      <Link to={url} className="article-card">
        <span className="article-card-category">{categorySlug}</span>
        <h4>{title}</h4>
        <p>{description}</p>
      </Link>
    </Tilt3D>
  );
};
