import { Link } from "react-router-dom";
function HomePage(){
    return(
        <div className="flex justify-center items-center">
            
            <div className="flex flex-col text-4xl text-blue-900 gap-8  justify-center items-center">
                <div><h1 className="text-5xl text-blue-800 p-4">Hello,User</h1></div>
                <div className="flex gap-8 justify-center items-center  bg-blue-200 w-full h-[80%] p-8 rounded">
                <div className="border-2 p-8 hover:bg-gray-100 shadow-md rounded text-blue-900 hover:text-blue-900"><Link to="/todo">To-Do</Link></div>
                <div className="border-2 p-8 hover:bg-gray-100 shadow-md rounded text-blue-900 hover:text-blue-900"><Link to="/notes">Notes</Link></div>
                <div className="border-2 p-8 hover:bg-gray-100 shadow-md rounded text-blue-900 hover:text-blue-900"><Link to="/pomodoro">Pomodoro Timer</Link></div>
                <div className="border-2 p-8 hover:bg-gray-100 shadow-md rounded text-blue-900 hover:text-blue-900"><Link to="/quote">Quotes</Link></div>
                </div>
            </div>
        </div>
    )
}
export default HomePage