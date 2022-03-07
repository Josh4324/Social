import React from "react";
import MainRouter from "./MainRouter";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";
import "./App.css";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <MainRouter />
    </ThemeProvider>
  );
};

export default App;
