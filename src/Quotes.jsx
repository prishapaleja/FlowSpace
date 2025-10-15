import axios from "axios"
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCopy, faDownload } from "@fortawesome/free-solid-svg-icons";

function Quotes(){
    const[quote,setQuote]=useState();
    const quotes="Its not over until i win."
    const getData=async ()=>{
    try{
    const response=await axios.get('https://zenquotes.io/api/random')
    // const response=await axios.get('https://thequoteshub.com/api/random-quote')
     const data = response.data[0];

    //   const random = data[Math.floor(Math.random() * data.length)];

    //   console.log(random); // for debugging
    //  setQuote(`"${random.q}" ~ ${random.a}`)
    
    setQuote(`"${data.q}"`)
    // setQuote(`"${response.data}"`)
    // console.log(`${response.data}`)
      
    }catch(err){
        console.log("Error Fetching Data..")
    }
}
 const copyQuote = () => {
    if (quotes) {
      navigator.clipboard.writeText(quotes);
      alert("✅ Quote copied to clipboard!");
    }
  };

  const downloadQuote = () => {
    if (quotes) {
      alert("Downloaded...");
    }
  };

  const likedQuote = () => {
    if (quotes) {
      alert("You liked Quote.");
    }
  };
// useEffect(()=>{
//     getData()
// },[])
    return (
        <div className="flex justify-center items-center flex-col w-full p-4">
            <div className="flex flex-col justify-center items-center w-[40rem] h-[20rem] lg:w-[80rem] lg:h-[35rem] p-10 bg-blue-100 m-1.5">
            {/* <h2 className="text-5xl text-[#0E0859]">{quote}</h2> */}
             <div className="flex items-center justify-center w-full max-w-5xl"><h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-[#0E0859] text-center" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>{quotes}</h2></div>
            {/* <button onClick={getData}>Get Data</button> */}
            <div className="flex items-center justify-evenly w-[10rem] sm:w-[10rem] sm:h-[4rem] md:w-60 md:h-15 font-semibold bg-blue-200 [box-shadow:8px_8px_15px_rgba(0,0,0,0.3)] rounded translate-x-[5rem] translate-y-[6rem] md:translate-x-[6rem] lg:translate-x-[10rem] ">
            <div className="hover:cursor-pointer hover:scale-150" onClick={likedQuote}> <FontAwesomeIcon icon={faHeart} style={{ color: "#ff0000" }} /></div>
            <div className="hover:cursor-pointer hover:scale-150" onClick={copyQuote}><FontAwesomeIcon icon={faCopy} style={{ color: "#0d2b5e" }} /></div>
            <div className="hover:cursor-pointer hover:scale-150"onClick={downloadQuote}><FontAwesomeIcon icon={faDownload} style={{ color: "#24385c" }} /></div>
            </div>
            </div>
           <div className="flex flex-col mt-[8rem] items-center justify-center w-full max-w-5xl max-h-[50rem]">
            <h2 className=" text-[#0E0859] text-2xl">Liked Quotes</h2>
             <div className="flex flex-col gap-[2rem] items-center justify-around rounded w-full h-full mt-[2rem] p-4">
              <div className="bg-white h-[2rem] w-[10rem] md:h-[4rem] md:w-[40rem] lg:h-[4rem] lg:w-[50rem] rounded border-1 border-[#0E0859] [box-shadow:8px_8px_15px_rgba(0,0,0,0.3)]"></div>
              <div className="bg-white h-[2rem] w-[10rem] md:h-[4rem] md:w-[40rem] lg:h-[4rem] lg:w-[50rem] rounded border-1 border-[#0E0859] [box-shadow:8px_8px_15px_rgba(0,0,0,0.3)]"></div>
             <div className="bg-white h-[2rem] w-[10rem] md:h-[4rem] md:w-[40rem] lg:h-[4rem] lg:w-[50rem] rounded border-1 border-[#0E0859] [box-shadow:8px_8px_15px_rgba(0,0,0,0.3)]"></div>

            </div>
           </div>
        </div>
    )
}
export default Quotes