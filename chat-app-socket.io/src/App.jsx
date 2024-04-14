import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Join from "./components/join/Join";
import Chat from "./components/chat/Chat";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Join />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
