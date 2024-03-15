import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter} from "react-router-dom";
import App from "./App";

// Auth Context
import { AuthContextProvider } from "./contexts/AuthContext";

// Pages
// import ErrorPage from "./pages/ErrorPage";

// Components
// import Root from "./components/Root";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  // </React.StrictMode>
);
