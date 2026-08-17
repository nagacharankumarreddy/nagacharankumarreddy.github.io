import { Tilt3D } from "../../home/components/Tilt3D";
import type { LearningHubCategory } from "../../../types/learningHub";

export const CategoryCard = ({ title, description, articleCount }: LearningHubCategory) => {
  return (
    <Tilt3D maxTilt={6}>
      <div className="category-card">
        <h3>{title}</h3>
        <p>{description}</p>
        <span className="category-card-count">
          {articleCount} {articleCount === 1 ? "article" : "articles"}
        </span>
      </div>
    </Tilt3D>
  );
};
