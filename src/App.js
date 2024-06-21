import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Navbar from "./components/navbar";
import HomePage from "./pages/HomePage";
import ArticleFetch from "./features/ArtcileFetch";
import ArticlePage from "./pages/ArticlePage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:category" element={<ArticleFetch />} />
        <Route path="/article/:title" element={<ArticlePage />} /> 
        <Route path="/saved" element={<ArticleFetch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
