import { createRoot } from "react-dom/client";

import App from "./App";

const rootElem = document.getElementById("root");

if (rootElem) {
  createRoot(rootElem).render(<App />);
}
