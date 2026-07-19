import { Link } from "react-router-dom";
import type { LearningHubArticle } from "../../../types/learningHub";

export const ArticleCard = ({ slug, title, description, categorySlug }: LearningHubArticle) => {
  return (
    <Link to={`/learning/${categorySlug}/${slug}`} className="article-card">
      <span className="article-card-category">{categorySlug}</span>
      <h4>{title}</h4>
      <p>{description}</p>
    </Link>
  );
};
