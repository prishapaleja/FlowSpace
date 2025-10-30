import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolder,
  faFile,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";

import FolderModal from "../components/FolderModal";
import { useRef, useEffect, useState } from "react";




function NotesPage() {
  const [data, setData] = useState({ folders: {}, pinned: [] });
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [noteContent, setNoteContent] = useState("");
  const [menuOpen, setMenuOpen] = useState(null);
  const [expandedFolders, setExpandedFolders] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(true); // mobile toggle
  const [recentFolders, setRecentFolders] = useState(
  JSON.parse(localStorage.getItem("recentFolders")) || []);
  const [showFolderModal,setShowFolderModal]=useState(false);
  const [showFileModal,setShowFileModal]=useState(false);
  const [searchTerm,setSearchTerm]=useState("");
  const folderRefs = useRef({});

  useEffect(() => {
    const saved = localStorage.getItem("notesData");
    if (saved) setData(JSON.parse(saved));
  }, []);
  

  useEffect(() => {
    localStorage.setItem("notesData", JSON.stringify(data));
  }, [data]);



  useEffect(() => {
  localStorage.setItem("recentFolders", JSON.stringify(recentFolders));
  }, [recentFolders]);

  
  const createFolder = (name) => {
    if (!name) return;
    if (data.folders[name]) return alert("Folder exists!");
    setData({ ...data, folders: { ...data.folders, [name]: { files: {} } } });
  };

  const createFile = (folder,file) => {
    if (!folder) return alert("Select a folder first!");
    if (data.folders[folder].files[file]) {
    return alert("File already exists!");
  }
    if (!file) return;
    const updated = { ...data }; //copy data 
    updated.folders[folder].files[file] = "";
    setData(updated);
  };

  const openFile = (folder, file) => {
    setSelectedFolder(folder);
    setSelectedNote(file);
    setNoteContent(folder ? data.folders[folder].files[file] : "");
  };

  const saveNote = (content) => {
    if (!selectedFolder || !selectedNote) return;
    const updated = { ...data };
    updated.folders[selectedFolder].files[selectedNote] = content;
    setData(updated);
    setNoteContent(content);
  };  

  const togglePin = (folder,file) => {
  const existing = data.pinned.find((p) => p.file === file && p.folder === folder);

  let pinned;
  if (existing) {
    // Unpin if already pinned
    pinned = data.pinned.filter((p) => !(p.file === file && p.folder === folder));
  } else {
    // Add new pin
    pinned = [...data.pinned, { folder, file }];
  }

  setData({ ...data, pinned });
  setMenuOpen(null);
};


  const deleteNote = (note, folder) => {
   if(!confirm("You want to Delete?"))  return;
    const updated = { ...data };
    if (folder) delete updated.folders[folder].files[note];
    updated.pinned = updated.pinned.filter((p) => !(p.file === note && p.folder === folder));
    setData(updated);
    setMenuOpen(null);
    if (selectedNote === note) setSelectedNote(null); //close the selected note if user viewing the note deletes the same note
  };

const openFolder = (folder) => {
  // Toggle folder expand
  setExpandedFolders(prev => ({ ...prev, [folder]: !prev[folder] }));

  // Add folder to recent list
  setRecentFolders(prev => {
    const updated = [folder, ...prev.filter(f => f !== folder)];
    return updated.slice(0, 5); // keep only 5 most recent
  });
   
  const folderElement = folderRefs.current[folder];
  if (folderElement) {
    folderElement.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    
    folderElement.classList.add("bg-yellow-300", "shadow-lg","border-yellow-300","border-8");
    setTimeout(() => {
      folderElement.classList.remove("bg-yellow-300", "shadow-lg","border-yellow-300","border-8");
    }, 1800);
  }
};
  return (
    <div className="flex">
      {/* Mobile toggle button */}
      <button
        className="md:hidden fixed top-[1rem] right-[2rem] z-50 bg-blue-600 text-white px-3 py-2 rounded-md shadow-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}>
        Folders
      </button>

      {
        showFolderModal && <FolderModal type="folder" onClose={()=>{setShowFolderModal(false)}} onSubmit={createFolder}/>
      }
      {
        showFileModal && <FolderModal type="file" onClose={()=>{setShowFileModal(false)}} onSubmit={(file)=>createFile(selectedFolder,file)}/>
      }
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-blue-200 p-4 overflow-y-auto transition-transform duration-300 z-40
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:w-[18vw] w-[60vw]`}
      >
        <button
          onClick={()=>setShowFolderModal(true)}
          className="bg-blue-700 text-white px-3 py-2 w-full rounded-md mt-[3rem] sm:mt-[2rem] md:mt-[5rem]"
        >
          + New Folder
        </button>


        {Object.keys(data.folders).map((folder) => (
  <div key={folder} className="relative mt-2" ref={(el) => (folderRefs.current[folder] = el)}>
    <div
      className={`bg-white w-full p-3 flex items-center justify-between cursor-pointer rounded-md shadow-md ${
        folder === selectedFolder ? "border-2 border-blue-600" : ""
      }`}
      onClick={() => openFolder(folder)}
    >
              <div className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faFolder}
                  className="text-blue-800 w-5 h-5"
                />
                {folder}
              </div>
             
            <button
              onClick={() =>
              setMenuOpen(menuOpen === folder ? null : folder)
              }
              className="text-gray-600 hover:text-black"
            >
            <FontAwesomeIcon icon={faEllipsisV} />
            </button>
            </div>
            {menuOpen === folder && (
           <div className="absolute bg-white border border-gray-200 rounded-md shadow-md z-10 w-[6rem] right-0 mt-2">
    <button
      onClick={() => {
        setSelectedFolder(folder);
        setShowFileModal(true); // show file modal to add file in this folder
        setMenuOpen(null); // close menu after click
      }}
      className="block w-full text-left px-3 py-2 hover:bg-gray-100"
    >
      Add File
    </button>
    <button
      onClick={() => {
        if (confirm(`Delete folder "${folder}"?`)) {
          const updated = { ...data };
          delete updated.folders[folder];
          setData(updated);
          setMenuOpen(null);
        setRecentFolders((prev)=>prev.filter(f=>f!==folder));
        }
      }}
      className="block w-full text-left px-3 py-2 text-red-600 hover:bg-gray-100"
    >
      Delete
    </button>
  </div>
)}


            {expandedFolders[folder] && (
              <div className="ml-5 mt-1 flex flex-col gap-1">
                {Object.keys(data.folders[folder].files).map((file) => (
                  <div
                    key={file}
                    className="bg-white p-2 rounded-md cursor-pointer hover:bg-blue-100 flex items-center justify-between"
                  >
                    <div
                      className="flex items-center gap-2"
                      onClick={() => {
                        openFile(folder, file);
                        setSidebarOpen(false); // hide sidebar on mobile
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faFile}
                        className="text-blue-700 w-4 h-4"
                      />
                      {file}
                    </div>

                    <button
                      onClick={() =>
                        setMenuOpen(menuOpen === file ? null : file)
                      }
                      className="text-gray-600 hover:text-black"
                    >
                      <FontAwesomeIcon icon={faEllipsisV} />
                    </button>
                    
                      {menuOpen === file && (
                        <div className="absolute bg-white border border-gray-200 rounded-md shadow-md z-10 w-[5rem] right-0 mt-[10rem]">
                          <button
                            onClick={() => togglePin(folder,file)}
                            className="block w-full text-left px-3 py-2 hover:bg-gray-100"
                          >
                            {data.pinned.some((p) => p.file === file && p.folder === folder)? "Unpin" : "Pin"}
                          </button>
                          <button
                            onClick={() => deleteNote(folder,file)}
                            className="block w-full text-left px-3 py-2 text-red-600 hover:bg-gray-100"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Main Section */}
      <div className="flex flex-col p-4 sm:ml-[0rem] md:ml-[10rem] lg:ml-[15rem] ml-0 w-full gap-8">
        
        {!selectedNote && (
          
          <div>
          <div className="flex md:justify-end sm:justify-center justify-center mt-[3rem] sm:mt-[0rem]">
          <div><input type="search" placeholder="Search notes or folder" className="border-2 border-blue-300 rounded-lg sm:p-2 text-gray-400 on focus:outline-none focus:shadow-lg w-[15rem]" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/></div>
          {/* <div><button className="bg-blue-200 text-blue-900 sm:p-2 rounded-tr-lg rounded-br-lg border-2 hover:bg-blue-400 hover:text-white">Search</button></div> */}
          </div>

          
            
      {searchTerm ? (
  <div>
    <h2 className="text-3xl text-[#0E0859] mb-[1rem]">
      Search Results for "{searchTerm}"
    </h2>

    {(() => {
      const results = Object.keys(data.folders)
        .map((folder) => {
          const folderMatches = folder.toLowerCase().includes(searchTerm.toLowerCase());
          const matchingFiles = Object.keys(data.folders[folder].files).filter((file) =>
            file.toLowerCase().includes(searchTerm.toLowerCase())
          );

          if (!folderMatches && matchingFiles.length === 0) return null;

          return (
            <div key={folder} className="mb-[2rem]">
              {folderMatches && (
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faFolder} className="text-blue-700 w-[2rem] h-[2rem]"/>
                <h3 className="text-xl font-semibold text-blue-900 cursor-pointer"onClick={() => openFolder(folder)}>
                  {folder}
                </h3>
                </div>
              )}

              <div className="ml-4 flex flex-col gap-2 mt-2">
                {matchingFiles.map((file) => (
                  <div
                    key={file}
                    className="bg-white p-2 rounded-md cursor-pointer hover:bg-blue-100 flex items-center gap-2"
                    onClick={() => openFile(folder, file)}
                  >
                    <FontAwesomeIcon icon={faFile} className="text-blue-600" />
                    {file} <span className="text-gray-400 ml-1">({folder})</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })
        .filter(Boolean);

      if (results.length === 0)
        return <p className="text-gray-600 text-lg">No matching folders or files found.</p>;

      return results;
    })()}
  </div>
) : (
          <>
            {/* Pinned Notes */}
            
            <div className="w-full p-4 rounded-md">
              <h2 className="text-3xl text-[#0E0859] mb-6">Pinned Notes</h2>
              <div className="flex flex-wrap gap-6">
                {data.pinned.length === 0 ? (
                  <p className="text-gray-600">No pinned notes yet</p>
                ) : (
                  data.pinned.map((note) => (
                    <div key={note} className="flex flex-col items-center justify-center relative bg-white p-3 rounded-md shadow-md w-[8rem] cursor-pointer" onClick={() => openFile(note.folder, note.file)}>
                      <FontAwesomeIcon icon={faFile} style={{ color: "#07B9FF" }} className="w-[5rem] h-[5rem]"/>
                      <p className="mt-2 text-center break-words">{note.file}</p>
                      <span className="text-sm text-gray-400">({note.folder})</span>
                    </div>
                  ))
                )}
              </div>
            </div>

              {/* Recent Folders */}
            <div className="w-full p-4 rounded-md mt-[2rem]">
             <h2 className="text-3xl text-[#0E0859] mb-6">Recent Folders</h2>

             {recentFolders.length === 0 ? (<p className="text-gray-600 text-lg">No folders opened yet.</p>) : (
           <div className="flex gap-6 flex-wrap">
          {recentFolders.map((folder) => (
         <div key={folder} className="flex flex-col items-center justify-center cursor-pointer" onClick={() => openFolder(folder)}>
          <FontAwesomeIcon icon={faFolder} style={{ color: "#0E0859" }} className="w-[7rem] h-[4rem]"/>
          <p className="mt-2 text-lg font-medium text-blue-900">{folder}</p>
        </div>
      ))}
      </div>
      )}
     </div>

           </> )
        }
        </div>  
        )}

        {/* Edit Notes */}
        {selectedNote && (
          <div className="lg:w-full p-4 bg-blue-200 rounded-md mt-[5rem] sm:mt-[4rem] md:mt-[1rem]">
            <button
              onClick={() => setSelectedNote(null)}
              className="mb-4 text-blue-700"
            >
              ← Back
            </button>
            <h2 className="text-2xl mb-2">{selectedNote}</h2>
            <textarea
              value={noteContent}
              onChange={(e) => saveNote(e.target.value)}
              className="w-full h-[70vh] border border-gray-300 rounded-md p-4 resize-none "
              placeholder="Write your note here..."
            />
          </div>
        )}
      </div>
    </div>
  )
}


export default NotesPage;
