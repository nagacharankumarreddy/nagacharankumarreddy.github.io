import { useEffect, useState } from "react";
import { FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { navLinks, site, socials } from "../data/content";
import type { SocialKey } from "../data/content";
import { ScrollTrigger, lockScroll, scrollToSection } from "../lib/motion";
import { Magnetic } from "./Magnetic";

const ICONS: Record<SocialKey, JSX.Element> = {
  instagram: <FaInstagram />,
  x: <FaXTwitter />,
  linkedin: <FaLinkedinIn />,
  github: <FaGithub />,
};

export const Navbar = () => {
  const [active, setActive] = useState("home");
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) < 6) return;
      setHidden(y > lastY && y > 120);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const triggers = navLinks.flatMap((link) =>
      link.id
        ? ScrollTrigger.create({
            trigger: `#${link.id}`,
            start: "top 50%",
            end: "bottom 50%",
            refreshPriority: -1,
            onToggle: (self) => self.isActive && setActive(link.id as string),
          })
        : []
    );

    return () => {
      window.removeEventListener("scroll", onScroll);
      triggers.forEach((t) => t.kill());
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    lockScroll(true);
    return () => lockScroll(false);
  }, [menuOpen]);

  const go = (id: string) => {
    setMenuOpen(false);
    lockScroll(false);
    scrollToSection(id);
  };

  const renderLink = (link: (typeof navLinks)[number], className: string) =>
    link.id ? (
      <a
        href={`#${link.id}`}
        className={className}
        aria-current={active === link.id ? "true" : undefined}
        onClick={(e) => {
          e.preventDefault();
          go(link.id as string);
        }}
      >
        {link.label}
      </a>
    ) : (
      <Link to={link.to as string} className={className}>
        {link.label}
      </Link>
    );

  return (
    <>
      <header className={`aw-nav ${hidden && !menuOpen ? "is-hidden" : ""}`}>
        <a
          href="#home"
          className="aw-nav-brand"
          onClick={(e) => {
            e.preventDefault();
            go("home");
          }}
        >
          {site.brand}
          <span aria-hidden="true">•</span>
        </a>

        <nav className="aw-nav-pill" aria-label="Primary">
          {navLinks.map((link) => (
            <Magnetic key={link.label}>{renderLink(link, "aw-nav-link")}</Magnetic>
          ))}
        </nav>

        <div className="aw-nav-right">
          <div className="aw-nav-socials">
            {socials.map((social) => (
              <Magnetic key={social.key}>
                <a href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}>
                  {ICONS[social.key]}
                </a>
              </Magnetic>
            ))}
          </div>
          <button
            type="button"
            className="aw-nav-toggle"
            aria-expanded={menuOpen}
            aria-controls="aw-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <div id="aw-menu" className={`aw-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <nav aria-label="Mobile">
          {navLinks.map((link, i) => (
            <div key={link.label} className="aw-menu-row" style={{ transitionDelay: `${i * 40}ms` }}>
              <span className="aw-mono">{String(i + 1).padStart(2, "0")}</span>
              {renderLink(link, "aw-menu-link")}
            </div>
          ))}
        </nav>
        <div className="aw-menu-socials">
          {socials.map((social) => (
            <a key={social.key} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}>
              {ICONS[social.key]}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};
