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
}
