import React from "react";
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
import DarkModeToggle from "../components/DarkModeToggle";

function HomePage(){
    return(
        
        <div className="flex justify-center items-center bg-gradient-to-t from-[#07B9FF] to-[#DBF4FF] h-screen w-full relative">
            <div className="absolute top-4 right-4 z-50">
                <DarkModeToggle />
            </div>
            
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 dark:text-cyan-300 mb-8">
                FlowSpace
            </div>

             <div className="flex flex-col text-4xl text-blue-900 gap-4 sm:gap-8 justify-center items-center mt-20 sm:mt-24 w-full max-w-6xl">
                <Loader/>
                
            {/* Grid layout for better mobile experience */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:grid-cols-4 lg:gap-8 lg:h-auto w-full px-2 sm:px-4">
                <Link to="/ToDo" className="w-full">
                    <div className="flex flex-col gap-1 sm:gap-2 justify-center items-center bg-gradient-to-t from-[#1F10BF] to-[#0E0859] dark:from-blue-600 dark:to-blue-800 shadow-md rounded-2xl sm:rounded-3xl text-white hover:shadow-xl transition-all text-xs sm:text-base md:text-xl lg:text-2xl h-28 sm:h-36 md:h-44 lg:h-52 hover:border-2 hover:scale-105 hover:cursor-pointer p-2 sm:p-4">
                        <FontAwesomeIcon icon={faClipboard} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl"/>
                        <span className="text-center">To-Do</span>
                    </div>
                </Link>

                <Link to="/notes" className="w-full">
                    <div className="flex flex-col gap-1 sm:gap-2 justify-center items-center bg-gradient-to-t from-[#1F10BF] to-[#0E0859] dark:from-blue-600 dark:to-blue-800 shadow-md rounded-2xl sm:rounded-3xl text-white hover:shadow-xl transition-all text-xs sm:text-base md:text-xl lg:text-2xl h-28 sm:h-36 md:h-44 lg:h-52 hover:border-2 hover:scale-105 hover:cursor-pointer p-2 sm:p-4">
                        <FontAwesomeIcon icon={faListCheck} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl" />
                        <span className="text-center">Notes</span>
                    </div>
                </Link>

                <Link to="/pomodoro" className="w-full">
                    <div className="flex flex-col gap-1 sm:gap-2 justify-center items-center text-center bg-gradient-to-t from-[#1F10BF] to-[#0E0859] dark:from-blue-600 dark:to-blue-800 shadow-md rounded-2xl sm:rounded-3xl text-white hover:shadow-xl transition-all text-xs sm:text-base md:text-xl lg:text-2xl h-28 sm:h-36 md:h-44 lg:h-52 hover:border-2 hover:scale-105 hover:cursor-pointer p-2 sm:p-4">
                        <FontAwesomeIcon icon={faStopwatch} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl" />
                        <span className="text-center leading-tight">Pomodoro<br className="sm:hidden"/> Timer</span>
                    </div>
                </Link>

                <Link to="/quote" className="w-full">
                    <div className="flex flex-col gap-1 sm:gap-2 justify-center items-center bg-gradient-to-t from-[#1F10BF] to-[#0E0859] dark:from-blue-600 dark:to-blue-800 shadow-md rounded-2xl sm:rounded-3xl text-white hover:shadow-xl transition-all text-xs sm:text-base md:text-xl lg:text-2xl h-28 sm:h-36 md:h-44 lg:h-52 hover:border-2 hover:scale-105 hover:cursor-pointer p-2 sm:p-4">
                        <div className="border-2 px-2 py-1 sm:px-4 sm:py-2 md:py-3 rounded-tr-2xl rounded-bl-2xl">
                            <FontAwesomeIcon icon={faQuoteLeft} className="text-sm sm:text-xl md:text-2xl" />
                            <FontAwesomeIcon icon={faQuoteRight} className="text-sm sm:text-xl md:text-2xl"/>
                        </div>
                        <span className="text-center">Quotes</span>
                    </div>
                </Link>
            </div>
        </div>
    </div>
    )
}
export default HomePage