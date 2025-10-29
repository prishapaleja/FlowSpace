import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Quotes from "./Pages/Quotes";
import HomePage from "./Pages/HomePage";
import Timer from "./Pages/Timer";
import ToDo from "./Pages/ToDo";
import NotesPage from "./Pages/NotesPage";
import SideNavbar from "./components/SideNavbar";


function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)} className="fixed top-[0.6rem] sm: left-[2rem] md:left-[6rem] lg:left-[1rem] z-20 p-2 bg-blue-50 text-blue-900 rounded-md hover:bg-blue-600 hover:text-white hover:shadow-sm text-2xl w-[2.5rem]">
        ☰
      </button>

      
      {isOpen && (<div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black bg-opacity-40 z-10"></div>)}

      <SideNavbar isOpen={isOpen} setIsOpen={setIsOpen} />

  
      <div className={`relative z-0 h-full w-full bg-white transition-all duration-300 ${ isOpen ? "blur-[2px]" : "" }`}>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/quote" element={<Quotes/>} />
          <Route path="/timer" element={<Timer/>} />
          <Route path="/todo" element={<ToDo/>} />
          <Route path="/notes" element={<NotesPage/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
