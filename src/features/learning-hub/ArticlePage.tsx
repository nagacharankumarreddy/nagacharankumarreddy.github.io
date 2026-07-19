import { useRef } from "react";
import { useParams } from "react-router-dom";
import { ArticleNotFound } from "./components/ArticleNotFound";
import { ArticlePagination } from "./components/ArticlePagination";
import { Breadcrumbs } from "./components/Breadcrumbs";
import { LearningHubLayout } from "./components/LearningHubLayout";
import { MarkdownRenderer } from "./components/MarkdownRenderer";
import { TableOfContents } from "./components/TableOfContents";
import { categories } from "./data/categories";
import { getAdjacentArticles, getArticle } from "./data/getArticle";
import { useActiveHeading } from "./lib/useActiveHeading";
import { useHeadings } from "./lib/useHeadings";
import "./styles/learning-hub.css";

export const ArticlePage = () => {
  const { categorySlug, articleSlug } = useParams<{
    categorySlug: string;
    articleSlug: string;
  }>();

  const contentRef = useRef<HTMLDivElement>(null);
  const headings = useHeadings(contentRef, `${categorySlug}/${articleSlug}`);
  const activeHeadingId = useActiveHeading(headings);

  const article =
    categorySlug && articleSlug ? getArticle(categorySlug, articleSlug) : undefined;

  if (!article || !categorySlug || !articleSlug) {
    return <ArticleNotFound />;
  }

  const categoryTitle =
    categories.find((category) => category.slug === categorySlug)?.title ?? categorySlug;
  const { previous, next } = getAdjacentArticles(categorySlug, articleSlug);

  return (
    <LearningHubLayout
      title={article.title}
      subtitle={article.description}
      beforeTitle={
        <Breadcrumbs
          items={[
            { label: "Learning Hub", to: "/learning-hub" },
            { label: categoryTitle, to: "/learning-hub" },
            { label: article.title },
          ]}
        />
      }
    >
      <TableOfContents headings={headings} activeId={activeHeadingId} />
      <div ref={contentRef}>
        <MarkdownRenderer content={article.content} images={article.images} />
      </div>
      <ArticlePagination previous={previous} next={next} />
    </LearningHubLayout>
  );
};
