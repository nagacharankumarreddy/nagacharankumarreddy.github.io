import { Link } from "react-router-dom";
import type { LearningHubArticle, LearningPath } from "../../../types/learningHub";

interface LearningPathSidebarProps {
  path: LearningPath;
  articlesById: Map<string, LearningHubArticle>;
  currentArticleId: string;
}

export const LearningPathSidebar = ({
  path,
  articlesById,
  currentArticleId,
}: LearningPathSidebarProps) => {
  return (
    <nav className="learning-path-sidebar" aria-label={path.title}>
      <span className="learning-path-sidebar-title">{path.title}</span>
      <ul>
        {path.articles.map((articleId) => {
          const article = articlesById.get(articleId);
          if (!article) return null;

          const isActive = articleId === currentArticleId;

          return (
            <li key={articleId} className={isActive ? "active" : undefined}>
              <Link to={article.url} aria-current={isActive ? "page" : undefined}>
                {article.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
