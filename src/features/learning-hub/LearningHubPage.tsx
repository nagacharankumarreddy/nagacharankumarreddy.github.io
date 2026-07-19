import "animate.css";
import { useEffect, useState } from "react";
import TrackVisibility from "react-on-screen";
import { ArticleCard } from "./components/ArticleCard";
import { CategoryCard } from "./components/CategoryCard";
import { LearningHubLayout } from "./components/LearningHubLayout";
import { SearchBar } from "./components/SearchBar";
import { articles } from "./data/articles";
import { categories } from "./data/categories";
import { searchArticles } from "./data/searchArticles";
import "./styles/learning-hub.css";

export const LearningHubPage = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(query), 150);
    return () => clearTimeout(timeout);
  }, [query]);

  const isSearching = debouncedQuery.trim().length > 0;
  const searchResults = isSearching ? searchArticles(debouncedQuery) : [];

  return (
    <LearningHubLayout
      title="Learning Hub"
      subtitle="Technical notes and documentation, organized by category."
    >
      <TrackVisibility>
        {({ isVisible }) => (
          <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
            <SearchBar value={query} onChange={setQuery} />

            {isSearching ? (
              <>
                <h2 className="learning-hub-section-title">Search Results</h2>
                {searchResults.length > 0 ? (
                  <div className="article-grid">
                    {searchResults.map((article) => (
                      <ArticleCard key={`${article.categorySlug}/${article.slug}`} {...article} />
                    ))}
                  </div>
                ) : (
                  <p className="learning-hub-no-results">
                    No results found for &quot;{debouncedQuery}&quot;. Try a different keyword.
                  </p>
                )}
              </>
            ) : (
              <>
                <div className="category-grid">
                  {categories.map((category) => (
                    <CategoryCard key={category.slug} {...category} />
                  ))}
                </div>

                <h2 className="learning-hub-section-title">Latest Articles</h2>
                <div className="article-grid">
                  {articles.map((article) => (
                    <ArticleCard key={`${article.categorySlug}/${article.slug}`} {...article} />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </TrackVisibility>
    </LearningHubLayout>
  );
};
