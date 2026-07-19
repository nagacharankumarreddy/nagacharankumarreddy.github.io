import { Link } from "react-router-dom";
import type { LearningHubArticle } from "../../../types/learningHub";

export const ArticleCard = ({ title, description, categorySlug, url }: LearningHubArticle) => {
  return (
    <Link to={url} className="article-card">
      <span className="article-card-category">{categorySlug}</span>
      <h4>{title}</h4>
      <p>{description}</p>
    </Link>
  );
};
