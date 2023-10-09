import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/toaster.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import "./globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeProvider defaultTheme="dark" storageKey="app-ui-theme">
      <App />
      <Toaster />
    </ThemeProvider>
  </BrowserRouter>
);
