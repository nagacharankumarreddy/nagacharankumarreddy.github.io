import {
  findDiscoveredArticle,
  getAdjacentDiscoveredArticles,
  getLearningPathProgress,
} from "./discoverContent";

export const getArticle = (categorySlug: string, articleSlug: string) =>
  findDiscoveredArticle(categorySlug, articleSlug);

export const getAdjacentArticles = (categorySlug: string, articleSlug: string) =>
  getAdjacentDiscoveredArticles(categorySlug, articleSlug);

export const getArticleLearningPathProgress = (categorySlug: string, articleSlug: string) =>
  getLearningPathProgress(categorySlug, articleSlug);
