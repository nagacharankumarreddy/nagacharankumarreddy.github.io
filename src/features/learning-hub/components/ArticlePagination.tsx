import { Link } from "react-router-dom";
import type { LearningHubArticle } from "../../../types/learningHub";

interface ArticlePaginationProps {
  previous: LearningHubArticle | null;
  next: LearningHubArticle | null;
}

export const ArticlePagination = ({ previous, next }: ArticlePaginationProps) => {
  if (!previous && !next) {
    return null;
  }

  return (
    <nav className="article-pagination" aria-label="Article navigation">
      {previous ? (
        <Link to={previous.url} className="article-pagination-link article-pagination-prev">
          <span className="article-pagination-label">← Previous</span>
          <span className="article-pagination-title">{previous.title}</span>
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
      {next ? (
        <Link to={next.url} className="article-pagination-link article-pagination-next">
          <span className="article-pagination-label">Next →</span>
          <span className="article-pagination-title">{next.title}</span>
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
    </nav>
  );
};
