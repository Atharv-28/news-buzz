import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/header";
import Navbar from "./components/navbar";
import HomePage from "./pages/HomePage";
import ArticleFetch from "./features/ArticleFetch";
import ArticlePage from "./pages/ArticlePage";

function App() {
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  const handleSearch = (event) => {
    setSearchTerm(event.target.value); // Update search term on input change
  };

  return (
    <BrowserRouter>
      <Header searchTerm={searchTerm} handleSearch={handleSearch} /> {/* Pass search props */}
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage searchTerm={searchTerm} />} />
        <Route path="/:category" element={<ArticleFetch searchTerm={searchTerm} />} /> {/* Pass searchTerm */}
        <Route path="/article/:title" element={<ArticlePage />} />
        <Route path="/saved" element={<ArticleFetch searchTerm={searchTerm} />} /> {/* Pass searchTerm */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
