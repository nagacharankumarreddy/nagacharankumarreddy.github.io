import type { LearningHubArticle, LearningHubCategory } from "../../../types/learningHub";

export interface DiscoveredArticle extends LearningHubArticle {
  content: string;
  images: Record<string, string>;
}

const ARTICLE_PATH_PATTERN = /content\/([^/]+)\/([^/]+)\/index\.md$/;
const IMAGE_PATH_PATTERN = /content\/([^/]+)\/([^/]+)\/images\/([^/]+)$/;

const humanize = (slug: string): string =>
  slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const extractTitle = (content: string, fallbackSlug: string): string => {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : humanize(fallbackSlug);
};

const extractDescription = (content: string): string => {
  const withoutHeading = content.replace(/^#\s+.+$/m, "").trim();
  const firstParagraph = withoutHeading
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .find((block) => block.length > 0 && !block.startsWith("#") && !block.startsWith("!["));

  if (!firstParagraph) {
    return "";
  }

  const plainText = firstParagraph.replace(/[*_`]/g, "").replace(/\s+/g, " ").trim();
  return plainText.length > 140 ? `${plainText.slice(0, 137)}...` : plainText;
};

// Eagerly loaded at build time: every content/<category>/<article>/index.md file.
const markdownModules = import.meta.glob<string>("../../../../content/*/*/index.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

// Eagerly loaded at build time: every image beside an article's index.md,
// resolved to its final build asset URL.
const imageModules = import.meta.glob<string>("../../../../content/*/*/images/*", {
  eager: true,
  import: "default",
});

const buildImageMap = (categorySlug: string, articleSlug: string): Record<string, string> => {
  const images: Record<string, string> = {};

  for (const [imagePath, url] of Object.entries(imageModules)) {
    const match = imagePath.match(IMAGE_PATH_PATTERN);
    if (!match) continue;

    const [, imageCategorySlug, imageArticleSlug, fileName] = match;
    if (imageCategorySlug === categorySlug && imageArticleSlug === articleSlug) {
      images[`./images/${fileName}`] = url;
      images[`images/${fileName}`] = url;
    }
  }

  return images;
};

const discoveredArticles: DiscoveredArticle[] = Object.entries(markdownModules)
  .map(([path, content]) => {
    const match = path.match(ARTICLE_PATH_PATTERN);
    if (!match) return null;

    const [, categorySlug, articleSlug] = match;

    const article: DiscoveredArticle = {
      slug: articleSlug,
      categorySlug,
      title: extractTitle(content, articleSlug),
      description: extractDescription(content),
      content,
      images: buildImageMap(categorySlug, articleSlug),
    };

    return article;
  })
  .filter((article): article is DiscoveredArticle => article !== null)
  .sort((a, b) => a.title.localeCompare(b.title));

const discoveredCategories: LearningHubCategory[] = (() => {
  const categoryMap = new Map<string, LearningHubCategory>();

  for (const article of discoveredArticles) {
    const existing = categoryMap.get(article.categorySlug);
    if (existing) {
      existing.articleCount += 1;
      continue;
    }

    const title = humanize(article.categorySlug);
    categoryMap.set(article.categorySlug, {
      slug: article.categorySlug,
      title,
      description: `${title} notes and articles.`,
      articleCount: 1,
    });
  }

  return Array.from(categoryMap.values()).sort((a, b) => a.title.localeCompare(b.title));
})();

export const getDiscoveredArticles = (): DiscoveredArticle[] => discoveredArticles;

export const getDiscoveredCategories = (): LearningHubCategory[] => discoveredCategories;

export const findDiscoveredArticle = (
  categorySlug: string,
  articleSlug: string
): DiscoveredArticle | undefined =>
  discoveredArticles.find(
    (article) => article.categorySlug === categorySlug && article.slug === articleSlug
  );

export interface AdjacentArticles {
  previous: DiscoveredArticle | null;
  next: DiscoveredArticle | null;
}

/** Previous/next relative to the same global, title-sorted article order shown on the landing page. */
export const getAdjacentDiscoveredArticles = (
  categorySlug: string,
  articleSlug: string
): AdjacentArticles => {
  const index = discoveredArticles.findIndex(
    (article) => article.categorySlug === categorySlug && article.slug === articleSlug
  );

  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: index > 0 ? discoveredArticles[index - 1] : null,
    next: index < discoveredArticles.length - 1 ? discoveredArticles[index + 1] : null,
  };
};
