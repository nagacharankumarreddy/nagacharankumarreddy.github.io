import { Outlet } from "react-router-dom";
import { NavBar } from "../features/home/components/NavBar";

export const MainLayout = () => {
  return (
    <div className="App">
      <NavBar />
      <Outlet />
    </div>
  );
};
