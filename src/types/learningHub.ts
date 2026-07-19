export interface LearningHubCategory {
  slug: string;
  title: string;
  description: string;
  articleCount: number;
}

export interface LearningHubArticle {
  slug: string;
  categorySlug: string;
  title: string;
  description: string;
}
