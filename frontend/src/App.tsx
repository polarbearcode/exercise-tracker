import "./App.css";
import { Route, Routes } from "react-router-dom";
import TestPage from "./TestPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<div>Welcome to the Exercise Tracker App</div>}
        />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </>
  );
}
