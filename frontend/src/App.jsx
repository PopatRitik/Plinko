import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer } from "../components/Footer.jsx";
import { Header } from "../components/Header.jsx";
import { Home } from "../pages/Home.jsx";
import { Game } from "../pages/Game.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;