import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import FileList from "./components/FileList";
import FileDetail from "./components/FileDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FileList />} />
        <Route path="/files/:fileId" element={<FileDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
