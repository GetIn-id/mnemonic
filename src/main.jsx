import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider, colors } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: colors.deepPurple,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
  </React.StrictMode>
);
