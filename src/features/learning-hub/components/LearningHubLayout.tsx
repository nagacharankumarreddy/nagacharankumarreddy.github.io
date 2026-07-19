import type { ReactNode } from "react";
import { Container } from "react-bootstrap";

interface LearningHubLayoutProps {
  title: string;
  subtitle?: string;
  /** Optional content rendered above the title, e.g. breadcrumbs. */
  beforeTitle?: ReactNode;
  children: ReactNode;
}

export const LearningHubLayout = ({
  title,
  subtitle,
  beforeTitle,
  children,
}: LearningHubLayoutProps) => {
  return (
    <section className="learning-hub" id="learning-hub">
      <Container>
        {beforeTitle}
        <h1>{title}</h1>
        {subtitle && <p className="learning-hub-subtitle">{subtitle}</p>}
        {children}
      </Container>
    </section>
  );
};
