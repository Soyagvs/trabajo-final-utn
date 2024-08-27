import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from "./components/layouts/footer/Footer";
import { Navbar } from "./components/layouts/navbar/Navbar";

import { Home } from "./pages/home/Home";
import { About } from "./pages/about/About";
import { Contacts } from "./pages/contacts/Contacts";
import { Posts } from "./pages/posts/Posts";

import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
