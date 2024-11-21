import { createRoot } from "react-dom/client"; //استفاده از React 18: وارد کردن createRoot از react-dom/client برای رندر کردن اپلیکیشن.

import App from "./App";

import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
