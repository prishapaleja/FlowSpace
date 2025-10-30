import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboard,
} from "@fortawesome/free-regular-svg-icons";
import {
  faListCheck,
  faStopwatch,
  faQuoteLeft,
  faQuoteRight
} from "@fortawesome/free-solid-svg-icons";
import Loader from "../components/loader";
function HomePage(){
    return(
        
        <div className="flex justify-center items-center bg-gradient-to-t from-[#07B9FF] to-[#DBF4FF] h-screen w-full relative">
            <div className="absolute top-4 right-4 text-2xl font-bold text-blue-900">FlowSpace</div>
            <div className="flex flex-col text-4xl text-blue-900 gap-8  justify-center items-center">
                <Loader/>
                <div className="flex gap-8 justify-center items-center text-2xl  lg:flex-row flex-wrap sm:p-8 p-[2rem]">
                <Link to="/ToDo">
                <div className="flex flex-col gap-2 justify-center items-center bg-gradient-to-t from-[#1F10BF] to-[#0E0859] shadow-md rounded-3xl text-white hover:shadow-sm text-xl sm:text-2xl md:text-3xl  h-[15vh] w-[45vw] sm:h-[20vh] sm:w-[30vw] md:h-[30vh] md:w-[40vw] lg:h-[45vh] lg:w-[15vw] hover:border-2 hover:cursor-pointer p-2">
                    <FontAwesomeIcon icon={faClipboard} style={{color: "#ffffff",}} className="text-4xl sm:text-5xl"/>
                    To-Do
                </div>
                </Link>
                <div className="flex flex-col gap-2 justify-center items-center bg-gradient-to-t from-[#1F10BF] to-[#0E0859] shadow-md rounded-3xl text-white hover:shadow-sm text-xl sm:text-2xl md:text-3xl h-[15vh] w-[45vw] sm:h-[20vh] sm:w-[30vw] md:h-[30vh] md:w-[40vw] lg:h-[45vh] lg:w-[15vw] hover:border-2 hover:cursor-pointer p-2">
                    <FontAwesomeIcon icon={faListCheck} style={{color: "#ffffff",}} className="text-4xl sm:text-5xl" />
                    <Link to="/notes">Notes</Link>
                    </div>
                <div className="flex flex-col gap-2 justify-center items-center text-center bg-gradient-to-t from-[#1F10BF] to-[#0E0859] shadow-md rounded-3xl text-white hover:shadow-sm text-xl sm:text-2xl md:text-3xl  h-[15vh] w-[45vw] sm:h-[20vh] sm:w-[30vw] md:h-[30vh] md:w-[40vw] lg:h-[45vh] lg:w-[15vw] hover:border-2 hover:cursor-pointer p-6">
                    <FontAwesomeIcon icon={faStopwatch} style={{color: "#ffffff",}} className="text-4xl sm:text-5xl" />
                    <Link to="/pomodoro">Pomodoro Timer</Link>
                    </div>
                <div className="flex flex-col gap-2 justify-center items-center bg-gradient-to-t from-[#1F10BF] to-[#0E0859] shadow-md rounded-3xl text-white hover:shadow-sm text-xl sm:text-2xl md:text-3xl  h-[15vh] w-[45vw] sm:h-[20vh] sm:w-[30vw] md:h-[30vh] md:w-[40vw] lg:h-[45vh] lg:w-[15vw] hover:border-2 hover:cursor-pointer p-2">
                    <div className="border-2 px-0 py-1 sm:px-4 sm:py-6 rounded-tr-2xl rounded-bl-2xl "><FontAwesomeIcon icon={faQuoteLeft} style={{color: "#ffffff",}} className="text-1xl sm:text-3xl" /><FontAwesomeIcon icon={faQuoteRight} style={{color: "#ffffff",}} className="text-1xl sm:text-3xl"/></div>
                    <Link to="/quote">Quotes</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default HomePage