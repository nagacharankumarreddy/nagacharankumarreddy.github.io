import { Suspense, lazy, useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import navIcon4 from "../../../assets/img/github.svg";
import navIcon2 from "../../../assets/img/gmail.svg";
import navIcon1 from "../../../assets/img/linkedin.svg";
import navIcon3 from "../../../assets/img/phone.svg";

// Framer Motion is only needed for the mobile overlay; code-split so it
// doesn't add weight to every page's initial bundle (desktop included).
const MobileNav = lazy(() => import("./MobileNav").then((m) => ({ default: m.MobileNav })));

export const NavBar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileNavOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileNavOpen]);

  const onUpdateActiveLink = (value: string) => {
    setActiveLink(value);
  };

  const isLearningHubActive = location.pathname.startsWith("/learning-hub");

  return (
    <>
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>
          <button
            type="button"
            className={
              isMobileNavOpen ? "navbar-toggler-custom is-hidden" : "navbar-toggler-custom"
            }
            aria-label="Open menu"
            aria-expanded={isMobileNavOpen}
            aria-controls="mobile-nav-overlay"
            onClick={() => setIsMobileNavOpen(true)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link
                as={HashLink}
                to="/#home"
                className={
                  activeLink === "home" ? "active navbar-link" : "navbar-link"
                }
                onClick={() => onUpdateActiveLink("home")}
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={HashLink}
                to="/#skills"
                className={
                  activeLink === "skills" ? "active navbar-link" : "navbar-link"
                }
                onClick={() => onUpdateActiveLink("skills")}
              >
                Skills
              </Nav.Link>
              <Nav.Link
                as={HashLink}
                to="/#project"
                className={
                  activeLink === "project"
                    ? "active navbar-link"
                    : "navbar-link"
                }
                onClick={() => onUpdateActiveLink("project")}
              >
                Projects
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/learning-hub"
                className={isLearningHubActive ? "active navbar-link" : "navbar-link"}
              >
                Learning Hub
              </Nav.Link>
            </Nav>
            <span className="navbar-text">
              <div className="social-icon">
                <a
                  href="https://www.linkedin.com/in/naga-charan-kumar-reddy-11378616a/"
                  target={"blank"}
                >
                  <img src={navIcon1} alt="linkedin" />
                </a>
                <a
                  href="mailto:nagacharankumarreddy@gmail.com"
                  target={"blank"}
                >
                  <img src={navIcon2} alt="mail" />
                </a>
                <a href="tel:8309340949" target={"blank"}>
                  <img src={navIcon3} alt="call" />
                </a>
                <a
                  href="https://github.com/nagacharankumarreddy/"
                  target={"blank"}
                >
                  <img src={navIcon4} alt="github" />
                </a>
              </div>
              <HashLink to="/#contact">
                <button>
                  <span>Contact</span>
                </button>
              </HashLink>
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Suspense fallback={null}>
        <MobileNav
          isOpen={isMobileNavOpen}
          onClose={() => setIsMobileNavOpen(false)}
          activeLink={activeLink}
          onNavigate={onUpdateActiveLink}
          isLearningHubActive={isLearningHubActive}
        />
      </Suspense>
    </>
  );
};
