import { Link } from "react-router-dom";
function HomePage(){
    return(
        <div className="flex justify-center items-center bg-gradient-to-t from-[#07B9FF] to-[#DBF4FF] h-screen">
            
            <div className="flex flex-col text-4xl text-blue-900 gap-8  justify-center items-center">
                <div><h1 className="text-5xl text-blue-800 p-4">Hello,User</h1></div>
                <div className="flex gap-8 justify-center items-center text-2xl">
                <div className="flex justify-center items-center bg-gradient-to-t from-[#1F10BF] to-[#0E0859] shadow-md rounded-3xl text-white hover:shadow-sm h-[45vh] w-[15vw] hover:border-2 hover:cursor-pointer p-2"><Link to="/todo">To-Do</Link></div>
                <div className="flex justify-center items-center bg-gradient-to-t from-[#1F10BF] to-[#0E0859] shadow-md rounded-3xl text-white hover:shadow-sm h-[45vh] w-[15vw] hover:border-2 hover:cursor-pointer p-2"><Link to="/notes">Notes</Link></div>
                <div className="flex justify-center items-center bg-gradient-to-t from-[#1F10BF] to-[#0E0859] shadow-md rounded-3xl text-white hover:shadow-sm h-[45vh] w-[15vw] hover:border-2 hover:cursor-pointer p-2"><Link to="/pomodoro">Pomodoro Timer</Link></div>
                <div className="flex justify-center items-center bg-gradient-to-t from-[#1F10BF] to-[#0E0859] shadow-md rounded-3xl text-white hover:shadow-sm h-[45vh] w-[15vw] hover:border-2 hover:cursor-pointer p-2"><Link to="/quote">Quotes</Link></div>
                </div>
            </div>
        </div>
    )
}
export default HomePage