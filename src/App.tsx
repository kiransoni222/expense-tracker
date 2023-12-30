import React, { useState } from "react";
import "./App.css";
import AmountBalanceComponent from "./components/AmountBalanceComponent";
import AmountProvider from "./context/AmountContext";

function App() {
  return (
    <AmountProvider>
      <AmountBalanceComponent />
    </AmountProvider>
  );
}

export default App;
