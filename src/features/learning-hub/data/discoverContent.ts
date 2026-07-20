import type {
  LearningHubArticle,
  LearningHubCategory,
  LearningPath,
} from "../../../types/learningHub";
import { parseSimpleYaml } from "../lib/parseSimpleYaml";
import { estimateReadingTimeMinutes } from "../lib/readingTime";

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
  id?: string;
  title?: string;
  description?: string;
  learningPath?: string;
  tags?: string[];
  body: string;
}

const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

/**
 * Front matter is purely optional and additive — content without a front matter
 * block is returned completely unchanged via `body`.
 */
const parseFrontmatter = (content: string): Frontmatter => {
  const match = content.match(FRONTMATTER_PATTERN);
  if (!match) {
    return { body: content };
  }

  const body = content.slice(match[0].length);
  const data = parseSimpleYaml(match[1]);

  const asString = (value: string | string[] | undefined): string | undefined =>
    Array.isArray(value) ? undefined : value;
  const asStringArray = (value: string | string[] | undefined): string[] | undefined =>
    Array.isArray(value) ? value : undefined;

  return {
    id: asString(data.id),
    title: asString(data.title),
    description: asString(data.description),
    learningPath: asString(data.learningPath),
    tags: asStringArray(data.tags),
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

// Eagerly loaded at build time: every learning-path config, e.g. learning-paths/entra-auth.yaml.
const learningPathModules = import.meta.glob<string>("../../../../learning-paths/*.yaml", {
  eager: true,
  query: "?raw",
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
    const { id, title, description, learningPath, tags, body } = parseFrontmatter(rawContent);

    const article: DiscoveredArticle = {
      slug: articleSlug,
      categorySlug,
      title: title ?? extractTitle(body, folderName),
      description: description ?? extractDescription(body),
      tags: tags ?? [],
      url: `/learning/${categorySlug}/${articleSlug}`,
      id: id ?? articleSlug,
      learningPathId: learningPath,
      readingTimeMinutes: estimateReadingTimeMinutes(body),
      content: body,
      images: buildImageMap(categorySlug, articleSlug),
    };

    return article;
  })
  .filter((article): article is DiscoveredArticle => article !== null)
  .sort((a, b) => a.title.localeCompare(b.title));

const discoveredLearningPaths: Map<string, LearningPath> = (() => {
  const paths = new Map<string, LearningPath>();

  for (const rawContent of Object.values(learningPathModules)) {
    const data = parseSimpleYaml(rawContent);
    const id = typeof data.id === "string" ? data.id : undefined;
    const title = typeof data.title === "string" ? data.title : undefined;
    const articles = Array.isArray(data.articles) ? data.articles : undefined;

    if (!id || !title || !articles) continue;

    paths.set(id, {
      id,
      title,
      description: typeof data.description === "string" ? data.description : "",
      articles,
    });
  }

  return paths;
})();

// Dev-time validation only: every article id listed in a learning path must resolve
// to a real discovered article. Logged, not thrown — a typo shouldn't break the build.
for (const path of discoveredLearningPaths.values()) {
  for (const articleId of path.articles) {
    const exists = discoveredArticles.some((article) => article.id === articleId);
    if (!exists) {
      console.error(
        `Learning path "${path.id}" references unknown article id "${articleId}".`
      );
    }
  }
}

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

export const getDiscoveredLearningPaths = (): LearningPath[] =>
  Array.from(discoveredLearningPaths.values());

export const getDiscoveredLearningPath = (id: string): LearningPath | undefined =>
  discoveredLearningPaths.get(id);

export interface LearningPathProgress {
  path: LearningPath;
  position: number;
  total: number;
}

export const getLearningPathProgress = (
  categorySlug: string,
  articleSlug: string
): LearningPathProgress | null => {
  const article = findDiscoveredArticle(categorySlug, articleSlug);
  const path = article?.learningPathId ? discoveredLearningPaths.get(article.learningPathId) : undefined;

  if (!article || !path) {
    return null;
  }

  const position = path.articles.indexOf(article.id);
  if (position === -1) {
    return null;
  }

  return { path, position: position + 1, total: path.articles.length };
};

/**
 * Previous/next relative to the article's learning path order, when it belongs to one.
 * Falls back to the global, title-sorted article order (as shown on the landing page)
 * for articles with no learning path — this keeps legacy/standalone articles working
 * exactly as before this feature existed.
 */
export const getAdjacentDiscoveredArticles = (
  categorySlug: string,
  articleSlug: string
): AdjacentArticles => {
  const article = findDiscoveredArticle(categorySlug, articleSlug);
  const path = article?.learningPathId ? discoveredLearningPaths.get(article.learningPathId) : undefined;

  if (article && path) {
    const order = path.articles;
    const index = order.indexOf(article.id);
    const resolve = (id: string | undefined): DiscoveredArticle | null =>
      id ? discoveredArticles.find((candidate) => candidate.id === id) ?? null : null;

    if (index !== -1) {
      return {
        previous: index > 0 ? resolve(order[index - 1]) : null,
        next: index < order.length - 1 ? resolve(order[index + 1]) : null,
      };
    }
  }

  const index = discoveredArticles.findIndex(
    (candidate) => candidate.categorySlug === categorySlug && candidate.slug === articleSlug
  );

  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: index > 0 ? discoveredArticles[index - 1] : null,
    next: index < discoveredArticles.length - 1 ? discoveredArticles[index + 1] : null,
  };
};
