import "bootstrap/dist/css/bootstrap.min.css";
import { AppRoutes } from "./app/routes";
import { ThemeProvider } from "./app/theme/ThemeProvider";
import { CustomCursor } from "./features/cursor/CustomCursor";
import "./features/home/styles/home.css";

function App() {
  return (
    <ThemeProvider>
      <CustomCursor />
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
