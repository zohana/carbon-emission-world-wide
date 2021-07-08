import React from "react";
import "./App.css";
import CarbonEmission from "./components/CarbonEmission";
import Title from "./components/ui/title";

const App = () => {
  return (
    <div>
      <nav>
        <Title
          variant="h4"
          component="h2"
          title="Carbon emission world wide from the year 1990 - 2019"
        />
      </nav>
      <CarbonEmission />
      <footer>
        <p>
          <small>©PriyankaGite, 2021</small>
        </p>
      </footer>
    </div>
  );
};

export default App;
