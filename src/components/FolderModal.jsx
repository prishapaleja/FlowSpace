import React from "react";
import { useState } from "react";

function FolderModal({type,onSubmit,onClose}){

    const [name,setName]=useState("");
    const submit=(e)=>{
    e.preventDefault();
    onSubmit(name);
    onClose();
    }
    return(
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-white bg-opacity-60">
            <div className="w-[15em] h-[10rem] lg:w-[25rem] lg:h-[15rem] border-2  bg-gradient-to-t from-[#67c1da] to-[#DBF4FF] flex justify-center items-center p-4 rounded-lg">
                <form onSubmit={submit}>
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder={`Enter ${type} name:`} className="p-2 border-0 rounded-lg m-4 hover:shadow-lg" required/>
                    <div className="flex gap-2">
                        <button type="submit" className="bg-green-400 hover:bg-green-600 font-semibold px-4 py-2 border-0 rounded-lg shadow-lg m-4">Done</button>
                        <button type="button" onClick={onClose} className="bg-red-400 hover:bg-red-600 px-4 font-semibold py-2 border-0 rounded-lg shadow-lg m-4">Cancel</button>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}
export default FolderModal;