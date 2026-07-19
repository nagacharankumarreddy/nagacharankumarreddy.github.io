import { findDiscoveredArticle, getAdjacentDiscoveredArticles } from "./discoverContent";

export const getArticle = (categorySlug: string, articleSlug: string) =>
  findDiscoveredArticle(categorySlug, articleSlug);

export const getAdjacentArticles = (categorySlug: string, articleSlug: string) =>
  getAdjacentDiscoveredArticles(categorySlug, articleSlug);
