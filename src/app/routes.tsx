import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ShowcasePage } from "../features/showcase/ShowcasePage";
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
        {/* The home page owns its navbar and scroll, so it sits outside MainLayout. */}
        <Route path="/" element={<ShowcasePage />} />
        <Route element={<MainLayout />}>
          <Route
            path="/learning-hub"
            element={
              <Suspense fallback={null}>
                <LearningHubPage />
              </Suspense>
            }
          />
          {/* "*" captures the rest of the path so nested article folders
              (e.g. azure/security/entra-auth) resolve without new routes. */}
          <Route
            path="/learning/:categorySlug/*"
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
