import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import navIcon4 from "../../../assets/img/github.svg";
import navIcon2 from "../../../assets/img/gmail.svg";
import navIcon1 from "../../../assets/img/linkedin.svg";
import navIcon3 from "../../../assets/img/phone.svg";

const NAV_ITEMS = [
  { key: "home", label: "Home", to: "/#home" },
  { key: "skills", label: "Skills", to: "/#skills" },
  { key: "project", label: "Projects", to: "/#project" },
] as const;

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  activeLink: string;
  onNavigate: (value: string) => void;
  isLearningHubActive: boolean;
}

export const MobileNav = ({
  isOpen,
  onClose,
  activeLink,
  onNavigate,
  isLearningHubActive,
}: MobileNavProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="mobile-nav-overlay"
          className="mobile-nav-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          <motion.div
            className="mobile-nav-panel"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <button
              type="button"
              className="mobile-nav-close"
              aria-label="Close menu"
              onClick={onClose}
            >
              &times;
            </button>

            <nav className="mobile-nav-links" aria-label="Mobile navigation">
              {NAV_ITEMS.map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + index * 0.05, duration: 0.3 }}
                >
                  <HashLink
                    to={item.to}
                    className={
                      activeLink === item.key ? "mobile-nav-link active" : "mobile-nav-link"
                    }
                    onClick={() => {
                      onNavigate(item.key);
                      onClose();
                    }}
                  >
                    {item.label}
                  </HashLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + NAV_ITEMS.length * 0.05, duration: 0.3 }}
              >
                <Link
                  to="/learning-hub"
                  className={isLearningHubActive ? "mobile-nav-link active" : "mobile-nav-link"}
                  onClick={onClose}
                >
                  Learning Hub
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + (NAV_ITEMS.length + 1) * 0.05, duration: 0.3 }}
              >
                <HashLink to="/#contact" className="mobile-nav-link" onClick={onClose}>
                  Contact
                </HashLink>
              </motion.div>
            </nav>

            <motion.div
              className="mobile-nav-socials"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <a
                href="https://www.linkedin.com/in/naga-charan-kumar-reddy-11378616a/"
                target="blank"
              >
                <img src={navIcon1} alt="linkedin" />
              </a>
              <a href="mailto:nagacharankumarreddy@gmail.com" target="blank">
                <img src={navIcon2} alt="mail" />
              </a>
              <a href="tel:8309340949" target="blank">
                <img src={navIcon3} alt="call" />
              </a>
              <a href="https://github.com/nagacharankumarreddy/" target="blank">
                <img src={navIcon4} alt="github" />
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
