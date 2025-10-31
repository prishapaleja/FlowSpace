import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolder,
  faFile,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";

import FolderModal from "../components/FolderModal";
import DarkModeToggle from "../components/DarkModeToggle";
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
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Dark Mode Toggle */}
      <div className="fixed top-4 right-16 sm:right-4 z-50">
        <DarkModeToggle />
      </div>

      {/* Mobile toggle button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 dark:bg-cyan-600 text-white px-3 py-2 rounded-md shadow-md text-sm"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "Close" : "Folders"}
      </button>

      {showFolderModal && (
        <FolderModal
          type="folder"
          onClose={() => {
            setShowFolderModal(false);
          }}
          onSubmit={createFolder}
        />
      )}
      {showFileModal && (
        <FolderModal
          type="file"
          onClose={() => {
            setShowFileModal(false);
          }}
          onSubmit={(file) => createFile(selectedFolder, file)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-blue-200 dark:bg-gray-800 p-3 sm:p-4 overflow-y-auto transition-transform duration-300 z-40
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 w-64 sm:w-72 md:w-80`}
      >
        <button
          onClick={() => setShowFolderModal(true)}
          className="bg-blue-700 dark:bg-cyan-600 text-white px-3 py-2 w-full rounded-md mt-12 sm:mt-8 md:mt-16 text-sm sm:text-base hover:bg-blue-800 dark:hover:bg-cyan-700 transition-colors"
        >
          + New Folder
        </button>

        {Object.keys(data.folders).map((folder) => (
          <div
            key={folder}
            className="relative mt-2"
            ref={(el) => (folderRefs.current[folder] = el)}
          >
            <div
              className={`bg-white dark:bg-gray-700 w-full p-2 sm:p-3 flex items-center justify-between cursor-pointer rounded-md shadow-md transition-colors ${
                folder === selectedFolder ? "border-2 border-blue-600 dark:border-cyan-500" : ""
              }`}
              onClick={() => openFolder(folder)}
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <FontAwesomeIcon
                  icon={faFolder}
                  className="text-blue-800 dark:text-cyan-400 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                />
                <span className="truncate text-sm sm:text-base dark:text-gray-200">{folder}</span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(menuOpen === folder ? null : folder);
                }}
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white flex-shrink-0 ml-2"
              >
                <FontAwesomeIcon icon={faEllipsisV} />
              </button>
            </div>
            {menuOpen === folder && (
              <div className="absolute bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-md z-10 w-28 right-0 mt-2">
                <button
                  onClick={() => {
                    setSelectedFolder(folder);
                    setShowFileModal(true);
                    setMenuOpen(null);
                  }}
                  className="block w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-sm dark:text-gray-200"
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
                      setRecentFolders((prev) => prev.filter((f) => f !== folder));
                    }
                  }}
                  className="block w-full text-left px-3 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600 text-sm"
                >
                  Delete
                </button>
              </div>
            )}

            {expandedFolders[folder] && (
              <div className="ml-4 sm:ml-5 mt-1 flex flex-col gap-1">
                {Object.keys(data.folders[folder].files).map((file) => (
                  <div
                    key={file}
                    className="bg-white dark:bg-gray-700 p-2 rounded-md cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-600 flex items-center justify-between"
                  >
                    <div
                      className="flex items-center gap-2 min-w-0 flex-1"
                      onClick={() => {
                        openFile(folder, file);
                        setSidebarOpen(false);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faFile}
                        className="text-blue-700 dark:text-cyan-400 w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
                      />
                      <span className="truncate text-sm dark:text-gray-200">{file}</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpen(menuOpen === file ? null : file);
                      }}
                      className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white flex-shrink-0 ml-2"
                    >
                      <FontAwesomeIcon icon={faEllipsisV} />
                    </button>

                    {menuOpen === file && (
                      <div className="absolute bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-md z-10 w-24 right-0 mt-24">
                        <button
                          onClick={() => togglePin(folder, file)}
                          className="block w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-sm dark:text-gray-200"
                        >
                          {data.pinned.some((p) => p.file === file && p.folder === folder)
                            ? "Unpin"
                            : "Pin"}
                        </button>
                        <button
                          onClick={() => deleteNote(folder, file)}
                          className="block w-full text-left px-3 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600 text-sm"
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
      <div className="flex flex-col p-3 sm:p-4 md:p-6 ml-0 md:ml-80 w-full gap-6 sm:gap-8">
        {!selectedNote && (
          <div className="mt-14 sm:mt-8 md:mt-4">
            <div className="flex justify-center md:justify-end mb-6">
              <input
                type="search"
                placeholder="Search notes or folder"
                className="border-2 border-blue-300 dark:border-cyan-600 dark:bg-gray-800 dark:text-gray-200 rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-cyan-500 w-full max-w-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {searchTerm ? (
              <div>
                <h2 className="text-2xl sm:text-3xl text-[#0E0859] dark:text-cyan-300 mb-4 sm:mb-6">
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
                        <div key={folder} className="mb-6">
                          {folderMatches && (
                            <div className="flex items-center gap-2 mb-2">
                              <FontAwesomeIcon
                                icon={faFolder}
                                className="text-blue-700 dark:text-cyan-400 w-6 h-6 sm:w-8 sm:h-8"
                              />
                              <h3
                                className="text-lg sm:text-xl font-semibold text-blue-900 dark:text-cyan-300 cursor-pointer hover:underline"
                                onClick={() => openFolder(folder)}
                              >
                                {folder}
                              </h3>
                            </div>
                          )}

                          <div className="ml-6 sm:ml-8 flex flex-col gap-2 mt-2">
                            {matchingFiles.map((file) => (
                              <div
                                key={file}
                                className="bg-white dark:bg-gray-800 p-3 rounded-md cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-700 flex items-center gap-2 shadow"
                                onClick={() => openFile(folder, file)}
                              >
                                <FontAwesomeIcon icon={faFile} className="text-blue-600 dark:text-cyan-400" />
                                <span className="text-sm sm:text-base dark:text-gray-200">{file}</span>
                                <span className="text-xs sm:text-sm text-gray-400 ml-1">({folder})</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })
                    .filter(Boolean);

                  if (results.length === 0)
                    return (
                      <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
                        No matching folders or files found.
                      </p>
                    );

                  return results;
                })()}
              </div>
            ) : (
              <>
                {/* Pinned Notes */}
                <div className="w-full p-3 sm:p-4 rounded-md">
                  <h2 className="text-2xl sm:text-3xl text-[#0E0859] dark:text-cyan-300 mb-4 sm:mb-6">
                    Pinned Notes
                  </h2>
                  <div className="flex flex-wrap gap-4 sm:gap-6">
                    {data.pinned.length === 0 ? (
                      <p className="text-gray-600 dark:text-gray-400">No pinned notes yet</p>
                    ) : (
                      data.pinned.map((note) => (
                        <div
                          key={note.file + note.folder}
                          className="flex flex-col items-center justify-center relative bg-white dark:bg-gray-800 p-3 rounded-md shadow-md w-28 sm:w-32 cursor-pointer hover:shadow-lg transition-shadow"
                          onClick={() => openFile(note.folder, note.file)}
                        >
                          <FontAwesomeIcon
                            icon={faFile}
                            className="text-[#07B9FF] dark:text-cyan-400 w-12 h-12 sm:w-16 sm:h-16"
                          />
                          <p className="mt-2 text-center break-words text-xs sm:text-sm dark:text-gray-200">
                            {note.file}
                          </p>
                          <span className="text-xs text-gray-400">({note.folder})</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Recent Folders */}
                <div className="w-full p-3 sm:p-4 rounded-md mt-6 sm:mt-8">
                  <h2 className="text-2xl sm:text-3xl text-[#0E0859] dark:text-cyan-300 mb-4 sm:mb-6">
                    Recent Folders
                  </h2>

                  {recentFolders.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
                      No folders opened yet.
                    </p>
                  ) : (
                    <div className="flex gap-4 sm:gap-6 flex-wrap">
                      {recentFolders.map((folder) => (
                        <div
                          key={folder}
                          className="flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform"
                          onClick={() => openFolder(folder)}
                        >
                          <FontAwesomeIcon
                            icon={faFolder}
                            className="text-[#0E0859] dark:text-cyan-400 w-16 h-10 sm:w-20 sm:h-12"
                          />
                          <p className="mt-2 text-sm sm:text-base font-medium text-blue-900 dark:text-cyan-300 text-center">
                            {folder}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* Edit Notes */}
        {selectedNote && (
          <div className="w-full p-3 sm:p-4 bg-blue-200 dark:bg-gray-800 rounded-md mt-14 sm:mt-8 md:mt-4">
            <button
              onClick={() => setSelectedNote(null)}
              className="mb-3 sm:mb-4 text-blue-700 dark:text-cyan-400 hover:underline text-sm sm:text-base"
            >
              ← Back
            </button>
            <h2 className="text-xl sm:text-2xl mb-2 sm:mb-3 dark:text-gray-200">{selectedNote}</h2>
            <textarea
              value={noteContent}
              onChange={(e) => saveNote(e.target.value)}
              className="w-full h-[60vh] sm:h-[70vh] border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-md p-3 sm:p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-cyan-500 text-sm sm:text-base"
              placeholder="Write your note here..."
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default NotesPage;