import React from "react";
import Footer from "../navbar/Footer";


function ActEquilibrium() {
  return (
    <div className="actEquilibriumContainer">
      <h2>Active Equilibrium</h2>

      <div className="parameterSection">
        <label>Equilibrium Current:</label>
        <input type="number" />
        <button>Set</button>
      </div>

      <div className="parameterSection">
        <label>Number of Battery:</label>
        <input type="number" />
        <button>Set</button>
      </div>

      <div className="parameterSection">
        <label>Equilibrium Start Volt:</label>
        <input type="number" />
        <button>Set</button>
      </div>

      <div className="parameterSection">
        <label>Equilibrium diff Volt:</label>
        <input type="number" />
        <button>Set</button>
      </div>

      <div className="parameterSection">
        <label>Sleep Time:</label>
        <input type="number" />
        <button>Set</button>
      </div>

      <div className="statusSection">
        <p>Equilibrium State: Off</p>
        <p>Equilibrium Current: 0 A</p>
        <p>Equilibrium Count: 0</p>
      </div>

      <Footer />
    </div>
  );
}

export default ActEquilibrium;
