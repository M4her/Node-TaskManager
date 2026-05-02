import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<StepOne />} />
       
      </Routes>
    </BrowserRouter>
  );
};

export default App;
