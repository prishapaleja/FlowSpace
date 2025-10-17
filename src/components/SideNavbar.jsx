import { Link } from "react-router-dom";

function SideNavbar({ isOpen, setIsOpen }) {
  return (
    <div className={`fixed top-0 left-0 h-full bg-blue-200 text-2xl text-blue-900 p-6 w-[70vw] md:w-[20vw] z-20 flex flex-col gap-8 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full" }`}>
      <button onClick={() => setIsOpen(false)} className="self-end mb-4 text-xl text-blue-800 hover:text-blue-600">
        ✕
      </button>

      <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
      <Link to="/todo" onClick={() => setIsOpen(false)}>To-Do List</Link>
      <Link to="/notes" onClick={() => setIsOpen(false)}>Notes Page</Link>
      <Link to="/pomodoro" onClick={() => setIsOpen(false)}>Pomodoro Timer</Link>
      <Link to="/quote" onClick={() => setIsOpen(false)}>Quotes</Link>
    </div>
  );
}

export default SideNavbar;
