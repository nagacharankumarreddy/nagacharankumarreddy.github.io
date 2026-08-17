import { AnimatePresence, motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import { NavBar } from "../features/home/components/NavBar";
import { ScrollProgressBar } from "../features/home/components/ScrollProgressBar";

export const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="App">
      <ScrollProgressBar />
      <NavBar />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
