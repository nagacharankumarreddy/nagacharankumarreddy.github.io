import { useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import { ArticleNotFound } from "./components/ArticleNotFound";
import { ArticlePagination } from "./components/ArticlePagination";
import { Breadcrumbs } from "./components/Breadcrumbs";
import { LearningHubLayout } from "./components/LearningHubLayout";
import { LearningPathProgress } from "./components/LearningPathProgress";
import { LearningPathSidebar } from "./components/LearningPathSidebar";
import { MarkdownRenderer } from "./components/MarkdownRenderer";
import { ScrollButtons } from "./components/ScrollButtons";
import { TableOfContents } from "./components/TableOfContents";
import { categories } from "./data/categories";
import { getDiscoveredArticles, getDiscoveredLearningPath } from "./data/discoverContent";
import {
  getAdjacentArticles,
  getArticle,
  getArticleLearningPathProgress,
} from "./data/getArticle";
import { useActiveHeading } from "./lib/useActiveHeading";
import { useHeadings } from "./lib/useHeadings";
import "./styles/learning-hub.css";

export const ArticlePage = () => {
  const params = useParams();
  const categorySlug = params.categorySlug;
  // "*" is the splat segment from the "/learning/:categorySlug/*" route —
  // it captures the full article slug, including any nested "/" segments.
  const articleSlug = params["*"];

  const contentRef = useRef<HTMLDivElement>(null);
  const headings = useHeadings(contentRef, `${categorySlug}/${articleSlug}`);
  const activeHeadingId = useActiveHeading(headings);

  const article =
    categorySlug && articleSlug ? getArticle(categorySlug, articleSlug) : undefined;

  const articlesById = useMemo(() => {
    const map = new Map(getDiscoveredArticles().map((a) => [a.id, a]));
    return map;
  }, []);

  if (!article || !categorySlug || !articleSlug) {
    return <ArticleNotFound />;
  }

  const categoryTitle =
    categories.find((category) => category.slug === categorySlug)?.title ?? categorySlug;
  const { previous, next } = getAdjacentArticles(categorySlug, articleSlug);
  const progress = getArticleLearningPathProgress(categorySlug, articleSlug);
  const learningPath = article.learningPathId
    ? getDiscoveredLearningPath(article.learningPathId)
    : undefined;

  return (
    <LearningHubLayout
      title={article.title}
      subtitle={article.description}
      beforeTitle={
        <Breadcrumbs
          items={
            learningPath
              ? [
                  { label: categoryTitle, to: "/learning-hub" },
                  { label: learningPath.title, to: "/learning-hub" },
                  { label: article.title },
                ]
              : [
                  { label: "Learning Hub", to: "/learning-hub" },
                  { label: categoryTitle, to: "/learning-hub" },
                  { label: article.title },
                ]
          }
        />
      }
      sidebar={
        learningPath ? (
          <LearningPathSidebar
            path={learningPath}
            articlesById={articlesById}
            currentArticleId={article.id}
          />
        ) : undefined
      }
    >
      <span className="article-reading-time">{article.readingTimeMinutes} min read</span>
      {progress && <LearningPathProgress position={progress.position} total={progress.total} />}
      <TableOfContents headings={headings} activeId={activeHeadingId} />
      <div ref={contentRef}>
        <MarkdownRenderer content={article.content} images={article.images} />
      </div>
      <ArticlePagination previous={previous} next={next} />
      <ScrollButtons />
    </LearningHubLayout>
  );
};
