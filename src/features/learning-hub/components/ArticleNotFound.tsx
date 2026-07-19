import { Link } from "react-router-dom";
import { LearningHubLayout } from "./LearningHubLayout";

export const ArticleNotFound = () => {
  return (
    <LearningHubLayout title="Article Not Found">
      <p className="learning-hub-subtitle">
        The article you're looking for doesn't exist or hasn't been published yet.
      </p>
      <Link to="/learning-hub" className="article-not-found-link">
        Back to Learning Hub
      </Link>
    </LearningHubLayout>
  );
};
