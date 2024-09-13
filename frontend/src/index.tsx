import ReactDOM from "react-dom/client";
import App from "./main-component/App/App";
import "./css/themify-icons.css";
import "./css/flaticon.css";
import "./sass/style.scss";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
} else {
  console.error("Root element not found");
}
