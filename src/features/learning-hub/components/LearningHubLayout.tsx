import type { ReactNode } from "react";
import { Container } from "react-bootstrap";

interface LearningHubLayoutProps {
  title: string;
  subtitle?: string;
  /** Optional content rendered above the title, e.g. breadcrumbs. */
  beforeTitle?: ReactNode;
  /** Optional sidebar, e.g. learning path navigation. Renders a two-column layout when present. */
  sidebar?: ReactNode;
  children: ReactNode;
}

export const LearningHubLayout = ({
  title,
  subtitle,
  beforeTitle,
  sidebar,
  children,
}: LearningHubLayoutProps) => {
  const body = (
    <>
      <h1>{title}</h1>
      {subtitle && <p className="learning-hub-subtitle">{subtitle}</p>}
      {children}
    </>
  );

  return (
    <section className="learning-hub" id="learning-hub">
      <Container>
        {beforeTitle}
        {sidebar ? (
          <div className="learning-hub-with-sidebar">
            {sidebar}
            <div>{body}</div>
          </div>
        ) : (
          body
        )}
      </Container>
    </section>
  );
};
