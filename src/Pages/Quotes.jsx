import axios from "axios"
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCopy, faDownload, faShare } from "@fortawesome/free-solid-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import {
  TwitterShareButton,
} from "react-share";

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
        <div className="flex justify-center items-center flex-col w-full p-4">
            <div className="flex flex-col justify-center items-center h-[100vh] w-[80%] sm:w-[60%] md:w-[80%] lg:w-full p-10 m-1.5 bg-gradient-to-t from-[#07B9FF] to-[#DBF4FF]">
            {/* <h2 className="text-5xl text-[#0E0859]">{quote}</h2> */}
            <div className="flex items-center justify-center w-full"><h2 className="text-xl sm:text-3xl md:text-4xl text-[#0E0859] text-center mt-[2rem]" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>{quote?.quote}</h2></div>
             <div className="flex items-center justify-center w-full"><h2 className="text-1xl sm:text-1xl lg:text-2xl text-[#52506e] mt-[2rem]" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>~ {quote?.author}</h2></div>
            <div className="flex items-center justify-evenly w-[10rem] sm:w-[10rem] sm:h-[4rem] md:w-60 md:h-15 m-[6rem] font-semibold bg-blue-200 [box-shadow:8px_8px_15px_rgba(0,0,0,0.3)] rounded-2xl ">
            <div className="hover:cursor-pointer hover:scale-150"> <FontAwesomeIcon icon={isLiked ? solidHeart : regularHeart} style={{ color: "#ff0000", cursor: "pointer" }} onClick={toggleLike}/></div>
            <div className="hover:cursor-pointer hover:scale-150" onClick={copyQuote}><FontAwesomeIcon icon={faCopy} style={{ color: "#0d2b5e" }} /></div>
            <div className="hover:cursor-pointer hover:scale-150" onClick={downloadQuote}><FontAwesomeIcon icon={faDownload} style={{ color: "#0d2b5e" }} /></div>
            <div className="hover:cursor-pointer hover:scale-150"><TwitterShareButton url={shareUrl}><FontAwesomeIcon icon={faShare} style={{ color: "#0d2b5e" }} /></TwitterShareButton></div>
            </div>
            <div className="bg-blue-200 text-[#0E0859] mt-[-4rem] p-4 rounded-2xl flex hover:bg-blue-300 hover:cursor-pointer font-semibold"><button onClick={getData}>New Quote</button>
            </div>
            </div>
           <div className="flex flex-col mt-[8vh] items-center justify-center w-full max-w-5xl max-h-[50rem]">
            <h2 className=" text-[#0E0859] text-3xl">Liked Quotes</h2>
             <div className="flex flex-col gap-[2rem] items-center rounded w-full h-auto overflow-y-auto justify-start mt-[2rem] p-2 bg-[#DBF4FF]">
              {
              likedQuotes.map((q, i) => (
               <div key={i} className="bg-white w-[80%] sm:w-[45%] md:w-[60%] lg:w-full rounded border-1 border-[#0E0859] [box-shadow:8px_8px_15px_rgba(0,0,0,0.3)] text-[#0E0859] flex justify-center items-center p-4">
                < p className="text-sm sm:text-base md:text-lg lg:text-lg">{q.quote}</p>
                </div>))
               }
            </div>
           </div>
        </div>
    )
}
export default Quotes