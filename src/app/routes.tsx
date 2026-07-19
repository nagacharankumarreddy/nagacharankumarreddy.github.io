import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "../features/home/HomePage";
import { MainLayout } from "../layouts/MainLayout";

const LearningHubPage = lazy(() =>
  import("../features/learning-hub/LearningHubPage").then((m) => ({ default: m.LearningHubPage }))
);
const ArticlePage = lazy(() =>
  import("../features/learning-hub/ArticlePage").then((m) => ({ default: m.ArticlePage }))
);

export const AppRoutes = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/learning-hub"
            element={
              <Suspense fallback={null}>
                <LearningHubPage />
              </Suspense>
            }
          />
          <Route
            path="/learning/:categorySlug/:articleSlug"
            element={
              <Suspense fallback={null}>
                <ArticlePage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
