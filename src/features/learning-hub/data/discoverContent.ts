import type { LearningHubArticle, LearningHubCategory } from "../../../types/learningHub";

export interface DiscoveredArticle extends LearningHubArticle {
  content: string;
  images: Record<string, string>;
}

// Matches content/<category>/<...any depth of folders>/index.md
// Group 1: category (top-level folder). Group 2: the rest of the path (the article slug,
// which may itself contain "/" for nested article folders).
const ARTICLE_PATH_PATTERN = /content\/([^/]+)\/(.+)\/index\.md$/;
const IMAGE_PATH_PATTERN = /content\/([^/]+)\/(.+)\/images\/([^/]+)$/;

const humanize = (slug: string): string =>
  slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

interface Frontmatter {
  title?: string;
  description?: string;
  tags?: string[];
  body: string;
}

const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

/**
 * Minimal, dependency-free front matter reader: supports simple `key: value`
 * lines and a `tags: [a, b]` / `tags: a, b` list. Purely optional and additive —
 * content without a front matter block (every existing article) is returned
 * completely unchanged via `body`.
 */
const parseFrontmatter = (content: string): Frontmatter => {
  const match = content.match(FRONTMATTER_PATTERN);
  if (!match) {
    return { body: content };
  }

  const body = content.slice(match[0].length);
  const unquote = (value: string) => value.trim().replace(/^["']|["']$/g, "");
  const data: Record<string, string> = {};

  for (const line of match[1].split(/\r?\n/)) {
    const lineMatch = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (lineMatch) {
      data[lineMatch[1].trim()] = lineMatch[2];
    }
  }

  const tags = data.tags
    ? data.tags
        .replace(/^\[|\]$/g, "")
        .split(",")
        .map(unquote)
        .filter(Boolean)
    : undefined;

  return {
    title: data.title ? unquote(data.title) : undefined,
    description: data.description ? unquote(data.description) : undefined,
    tags,
    body,
  };
};

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

// Eagerly loaded at build time: every content/<category>/.../index.md file,
// at any nesting depth beneath the category folder.
const markdownModules = import.meta.glob<string>("../../../../content/**/index.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

// Eagerly loaded at build time: every image beside an article's index.md,
// resolved to its final build asset URL, at any nesting depth.
const imageModules = import.meta.glob<string>("../../../../content/**/images/*", {
  eager: true,
  import: "default",
});

// Keyed by filename only — MarkdownRenderer normalizes whatever prefix/encoding
// an author wrote ("./images/x.png", "images/x.png", or a bare "x.png", with or
// without "%20"-style escaping) down to the literal, decoded filename before
// looking it up here, so a single filename key covers every reference style.
const buildImageMap = (categorySlug: string, articleSlug: string): Record<string, string> => {
  const images: Record<string, string> = {};

  for (const [imagePath, url] of Object.entries(imageModules)) {
    const match = imagePath.match(IMAGE_PATH_PATTERN);
    if (!match) continue;

    const [, imageCategorySlug, imageArticleSlug, fileName] = match;
    if (imageCategorySlug === categorySlug && imageArticleSlug === articleSlug) {
      images[fileName] = url;
    }
  }

  return images;
};

const discoveredArticles: DiscoveredArticle[] = Object.entries(markdownModules)
  .map(([path, rawContent]) => {
    const match = path.match(ARTICLE_PATH_PATTERN);
    if (!match) return null;

    const [, categorySlug, articleSlug] = match;
    const folderName = articleSlug.split("/").pop() ?? articleSlug;
    const { title, description, tags, body } = parseFrontmatter(rawContent);

    const article: DiscoveredArticle = {
      slug: articleSlug,
      categorySlug,
      title: title ?? extractTitle(body, folderName),
      description: description ?? extractDescription(body),
      tags: tags ?? [],
      url: `/learning/${categorySlug}/${articleSlug}`,
      content: body,
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
