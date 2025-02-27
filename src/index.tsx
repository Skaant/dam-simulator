import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const domNode = document.getElementById("app");

domNode && createRoot(domNode).render(<App />);
