export interface LearningHubCategory {
  slug: string;
  title: string;
  description: string;
  articleCount: number;
}

export interface LearningHubArticle {
  /** Article path within its category; may contain "/" for nested article folders. */
  slug: string;
  categorySlug: string;
  title: string;
  description: string;
  /** App route for this article, e.g. "/learning/azure/entra-auth". */
  url: string;
  tags: string[];
  /** Stable identity for learning-path ordering; falls back to slug when no frontmatter id is set. */
  id: string;
  /** Learning path this article belongs to, if any (matches a learning-paths/*.yaml id). */
  learningPathId?: string;
  /** Estimated reading time in minutes, derived from word count. */
  readingTimeMinutes: number;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  /** Ordered article ids, matching LearningHubArticle.id. */
  articles: string[];
}
