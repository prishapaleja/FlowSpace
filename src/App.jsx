import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Quotes from "./Pages/Quotes";
import HomePage from "./Pages/HomePage";
import NotesPage from "./Pages/NotesPage";
import SideNavbar from "./components/SideNavbar";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)} className="fixed top-[2.2rem] left-[4rem] sm:left-[10rem] md:left-[8rem] lg:left-[2rem] z-20 p-2 text-blue-900 rounded-md hover:bg-blue-200 hover:shadow-sm text-2xl w-[2.5rem]">
        ☰
      </button>

      
      {isOpen && (<div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black bg-opacity-40 z-10"></div>)}

      <SideNavbar isOpen={isOpen} setIsOpen={setIsOpen} />

  
      <div className={`relative z-0 h-full w-full bg-white transition-all duration-300 ${ isOpen ? "blur-[2px]" : "" }`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quote" element={<Quotes />} />
          <Route path="/notes" element={<NotesPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
