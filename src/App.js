// App.js
import React from "react";
import AddDengueData from "./AddDengueData";
import DengueDataList from "./DengueDataList";
import CsvUploader from "./CsvUploader";
import DengueCharts from "./DengueCharts";
import Cartogram from "./Cartogram"; // Import the Cartogram map component
import "./AppStyles.css";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Dengue Data CRUD App</h1>
      </header>
      <main className="app-main">
        <div className="card">
          <AddDengueData />
        </div>
        <div className="card">
          <CsvUploader />
        </div>
        <div className="card">
          <DengueDataList />
        </div>
        <div className="card">
          <DengueCharts />
        </div>
        <div className="card">
          <Cartogram /> {/* Add the Cartogram map */}
        </div>
      </main>
    </div>
  );
}

export default App;
