import React from "react";
import ReactDOM from "react-dom/client";

// When a new deployment changes chunk hashes, browsers with cached HTML
// may request old chunk files that no longer exist (404). Detect this and
// reload once so the browser picks up the fresh HTML with updated chunk names.
window.addEventListener('error', (event) => {
  const src = (event.target as HTMLScriptElement | null)?.src ?? '';
  if (src && src.includes('/assets/') && event.target instanceof HTMLScriptElement) {
    const reloadedKey = 'chunk_reload_attempted';
    if (!sessionStorage.getItem(reloadedKey)) {
      sessionStorage.setItem(reloadedKey, '1');
      window.location.reload();
    }
  }
}, true);
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router/Router";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "./contexts/LanguageContext";
import { SearchProvider } from "./contexts/SearchContext";
import ErrorBoundary from "./Components/ErrorBoundary";

const helmetContext = {};
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <HelmetProvider context={helmetContext}>
        <LanguageProvider>
          <SearchProvider>
            <RouterProvider router={router} />
          </SearchProvider>
        </LanguageProvider>
      </HelmetProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
