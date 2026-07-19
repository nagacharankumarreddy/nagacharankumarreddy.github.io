import Fuse from "fuse.js";
import type { LearningHubArticle } from "../../../types/learningHub";
import { getDiscoveredArticles, getDiscoveredCategories } from "./discoverContent";

interface SearchableArticle extends LearningHubArticle {
  categoryTitle: string;
  content: string;
}

const categoryTitleBySlug = new Map(
  getDiscoveredCategories().map((category) => [category.slug, category.title])
);

const searchableArticles: SearchableArticle[] = getDiscoveredArticles().map((article) => ({
  ...article,
  categoryTitle: categoryTitleBySlug.get(article.categorySlug) ?? article.categorySlug,
}));

const fuse = new Fuse(searchableArticles, {
  keys: [
    { name: "title", weight: 0.5 },
    { name: "categoryTitle", weight: 0.3 },
    { name: "content", weight: 0.2 },
  ],
  threshold: 0.35,
  ignoreLocation: true,
  minMatchCharLength: 2,
});

export const searchArticles = (query: string): SearchableArticle[] => {
  const trimmed = query.trim();
  if (!trimmed) {
    return [];
  }

  return fuse.search(trimmed).map((result) => result.item);
};
