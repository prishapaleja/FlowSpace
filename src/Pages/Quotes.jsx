import axios from "axios"
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCopy, faDownload, faShare } from "@fortawesome/free-solid-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import {
  TwitterShareButton,
} from "react-share";
import DarkModeToggle from "../components/DarkModeToggle";

function Quotes(){
     const shareUrl=window.location.href;
    const[quote,setQuote]=useState(null);
    const [likedQuotes, setLikedQuotes] = useState([]);
    // const quotes="Its not over until i win."
    const getData=async ()=>{
    try{
    // const response=await axios.get('https://zenquotes.io/api/random')
    const response=await axios.get(
       "https://api.api-ninjas.com/v1/quotes",
        {
          headers: {
            "X-Api-Key": "HXXz7ZOTUxFWyofPJFu/Gg==dvtYpcyg3eXNfXJm", 
          },
        }
    )
     const data = response.data[0];

    //   const random = data[Math.floor(Math.random() * data.length)];

    //   console.log(random); // for debugging
    //  setQuote(`"${random.q}" ~ ${random.a}`)
    
    setQuote(data)
    // setQuote(`"${response.data}"`)
    // console.log(`${response.data}`)
      
    }catch(err){
        console.log("Error Fetching Data..")
    }
}
const downloadQuote = () => {
  if (!quote?.quote) return; 
  // alert("Downloading...");
  // Create a blob (a small file in memory) with the quote text
  const file = new Blob([quote.quote], { type: "text/plain" });

  // Create a temporary link
  const link = document.createElement("a");
  link.href = URL.createObjectURL(file); // Point link to our file
  link.download = "quote.txt"; 

  // Click the link programmatically to trigger download
  link.click();
};

 const copyQuote = () => {
    if (!(quote.quote)) return;
      navigator.clipboard.writeText(quote.quote);
      alert("Quote copied to clipboard!");
    
  };
 


  const toggleLike = () => {
  if (!quote?.quote) return;
  const stored = JSON.parse(localStorage.getItem("likedQuotes")) || [];
  const alreadyLiked = stored.find(q => q.quote === quote.quote);
  let updated;
  if (alreadyLiked) {
    // Unlike
    updated = stored.filter(q => q.quote !== quote.quote);
  } else {
    // Like
    updated = [...stored, quote];
  }
  localStorage.setItem("likedQuotes", JSON.stringify(updated));
  setLikedQuotes(updated);
};
  const isLiked = quote?.quote? likedQuotes.some(q => q.quote === quote.quote):false;

useEffect(()=>{
  const stored = JSON.parse(localStorage.getItem("likedQuotes")) || [];
  setLikedQuotes(stored);
    getData()
},[])
    return (
        <div className="flex justify-center items-center flex-col w-full p-2 sm:p-4 dark:bg-gray-900 min-h-screen">
            {/* Dark Mode Toggle */}
            <div className="fixed top-4 right-4 z-50">
                <DarkModeToggle />
            </div>

            <div className="flex flex-col justify-center items-center min-h-[90vh] sm:h-[100vh] w-full max-w-6xl px-4 sm:px-8 py-6 sm:py-10 m-1.5 bg-gradient-to-t from-[#07B9FF] to-[#DBF4FF] dark:from-gray-800 dark:to-gray-900 rounded-2xl sm:rounded-3xl">
                {/* Quote Text */}
                <div className="flex items-center justify-center w-full px-4 sm:px-6">
                    <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-[#0E0859] dark:text-cyan-300 text-center mt-4 sm:mt-8" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                        {quote?.quote}
                    </h2>
                </div>

                {/* Author */}
                <div className="flex items-center justify-center w-full px-4 sm:px-6">
                    <h2 className="text-sm sm:text-lg md:text-xl lg:text-2xl text-[#52506e] dark:text-gray-400 mt-4 sm:mt-8 text-center" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                        ~ {quote?.author}
                    </h2>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-evenly w-full max-w-xs sm:max-w-sm md:max-w-md gap-2 sm:gap-4 mt-8 sm:mt-12 md:mt-16 font-semibold bg-blue-200 dark:bg-gray-700 shadow-lg rounded-2xl p-3 sm:p-4">
                    <div className="hover:cursor-pointer hover:scale-125 transition-transform p-2" onClick={toggleLike}>
                        <FontAwesomeIcon icon={isLiked ? solidHeart : regularHeart} className="text-red-500 text-xl sm:text-2xl" />
                    </div>
                    <div className="hover:cursor-pointer hover:scale-125 transition-transform p-2" onClick={copyQuote}>
                        <FontAwesomeIcon icon={faCopy} className="text-[#0d2b5e] dark:text-cyan-400 text-xl sm:text-2xl" />
                    </div>
                    <div className="hover:cursor-pointer hover:scale-125 transition-transform p-2" onClick={downloadQuote}>
                        <FontAwesomeIcon icon={faDownload} className="text-[#0d2b5e] dark:text-cyan-400 text-xl sm:text-2xl" />
                    </div>
                    <div className="hover:cursor-pointer hover:scale-125 transition-transform p-2">
                        <TwitterShareButton url={shareUrl}>
                            <FontAwesomeIcon icon={faShare} className="text-[#0d2b5e] dark:text-cyan-400 text-xl sm:text-2xl" />
                        </TwitterShareButton>
                    </div>
                </div>

                {/* New Quote Button */}
                <div className="bg-blue-200 dark:bg-cyan-600 text-[#0E0859] dark:text-white mt-6 sm:mt-8 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl flex hover:bg-blue-300 dark:hover:bg-cyan-700 hover:cursor-pointer font-semibold text-sm sm:text-base transition-colors">
                    <button onClick={getData}>New Quote</button>
                </div>
            </div>

            {/* Liked Quotes Section */}
            <div className="flex flex-col mt-8 sm:mt-12 md:mt-16 items-center justify-center w-full max-w-5xl px-4">
                <h2 className="text-[#0E0859] dark:text-cyan-300 text-2xl sm:text-3xl mb-4 sm:mb-6">Liked Quotes</h2>
                <div className="flex flex-col gap-4 sm:gap-6 items-center rounded w-full max-h-96 sm:max-h-[30rem] overflow-y-auto p-4 bg-[#DBF4FF] dark:bg-gray-800">
                    {likedQuotes.length === 0 ? (
                        <p className="text-gray-600 dark:text-gray-400 text-center py-8">No liked quotes yet. Start liking some quotes!</p>
                    ) : (
                        likedQuotes.map((q, i) => (
                            <div key={i} className="bg-white dark:bg-gray-700 w-full max-w-3xl rounded-lg border border-[#0E0859] dark:border-cyan-500 shadow-lg text-[#0E0859] dark:text-gray-200 flex flex-col justify-center items-start p-4 sm:p-6">
                                <p className="text-sm sm:text-base md:text-lg">{q.quote}</p>
                                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2">- {q.author}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
export default Quotes