import "./App.css";
import { Route, Routes } from "react-router-dom";
import TestPage from "./TestPage";
import Home from "./Home";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </>
  );
}
