import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolder,
  faFile,
  faEllipsisV,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

function NotesPage() {
  const [data, setData] = useState({ folders: {}, pinned: [] });
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [noteContent, setNoteContent] = useState("");
  const [menuOpen, setMenuOpen] = useState(null);
  const [expandedFolders, setExpandedFolders] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(true); // mobile toggle
  const [recentFolders, setRecentFolders] = useState(
  JSON.parse(localStorage.getItem("recentFolders")) || []
);

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

  const createFolder = () => {
    const name = prompt("Enter folder name:");
    if (!name) return;
    if (data.folders[name]) return alert("Folder exists!");
    setData({ ...data, folders: { ...data.folders, [name]: { files: {} } } });
  };

  const createFile = (folder) => {
    if (!folder) return alert("Select a folder first!");
    const noteName = prompt("Enter file name:");
    if (!noteName) return;
    const updated = { ...data };
    updated.folders[folder].files[noteName] = "";
    setData(updated);
  };

  const openFile = (folder, note) => {
    setSelectedFolder(folder);
    setSelectedNote(note);
    setNoteContent(folder ? data.folders[folder].files[note] : "");
  };

  const saveNote = (content) => {
    if (!selectedFolder || !selectedNote) return;
    const updated = { ...data };
    updated.folders[selectedFolder].files[selectedNote] = content;
    setData(updated);
    setNoteContent(content);
  };

  const togglePin = (note) => {
    const pinned = data.pinned.includes(note)? data.pinned.filter((n) => n !== note): [...data.pinned, note];
    setData({ ...data, pinned });
    setMenuOpen(null);
  };

  const deleteNote = (note, folder) => {
   if(!confirm("You want to Delete?"))  return;
    const updated = { ...data };
    if (folder) delete updated.folders[folder].files[note];
    updated.pinned = updated.pinned.filter((n) => n !== note);
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
};




  return (
    <div className="flex">
      {/* Mobile toggle button */}
      <button
        className="md:hidden fixed top-[2rem] right-[2rem] z-50 bg-blue-600 text-white px-3 py-2 rounded-md shadow-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}>
        Folders
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-blue-200 p-4 overflow-y-auto transition-transform duration-300 z-40
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:w-[18vw] w-[60vw]`}
      >
        <button
          onClick={createFolder}
          className="bg-blue-700 text-white px-3 py-2 w-full rounded-md mt-[3rem] sm:mt-[2rem] md:mt-[5rem]"
        >
          + New Folder
        </button>

        {Object.keys(data.folders).map((folder) => (
          <div key={folder} className="relative mt-2">
            <div
              className="bg-white w-full p-3 flex items-center justify-between cursor-pointer rounded-md shadow-md"
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
                onClick={(e) => {
                  e.stopPropagation();
                  createFile(folder);
                }}
                className="bg-blue-500 text-white w-[1.3rem] h-[1.3rem] rounded-full text-sm font-extrabold hover:bg-blue-600"
              >
                +
              </button>
            
            </div>

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
                          onClick={() => togglePin(file)}
                          className="block w-full text-left px-3 py-2 hover:bg-gray-100"
                        >
                          {data.pinned.includes(file) ? "📌 Unpin" : "📌 Pin"}
                        </button>
                        <button
                          onClick={() => deleteNote(file, folder)}
                          className="block w-full text-left px-3 py-2 text-red-600 hover:bg-gray-100"
                        >
                          🗑️ Delete
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
          <>
            {/* Pinned Notes */}
            <div className="w-full p-4 bg-blue-200 rounded-md mt-[5rem]">
              <h2 className="text-3xl text-[#0E0859] mb-6">Pinned Notes</h2>
              <div className="flex flex-wrap gap-6">
                {data.pinned.length === 0 ? (
                  <p className="text-gray-600">No pinned notes yet</p>
                ) : (
                  data.pinned.map((note) => (
                    <div
                      key={note}
                      className="flex flex-col items-center justify-center relative bg-white p-3 rounded-md shadow-md w-[8rem] cursor-pointer"
                      onClick={() => openFile(null, note)}
                    >
                      <FontAwesomeIcon
                        icon={faFile}
                        style={{ color: "#07B9FF" }}
                        className="w-[5rem] h-[5rem]"
                      />
                      <p className="mt-2 text-center break-words">{note}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="w-full p-4 bg-blue-200 rounded-md mt-[5rem]">
  <h2 className="text-3xl text-[#0E0859] mb-6">Recent Folders</h2>

  {recentFolders.length === 0 ? (
    <p className="text-gray-600 text-lg">No folders opened yet.</p>
  ) : (
    <div className="flex gap-6 flex-wrap">
      {recentFolders.map((folder) => (
        <div
          key={folder}
          className="flex flex-col items-center justify-center cursor-pointer"
          onClick={() => openFolder(folder)}
        >
          <FontAwesomeIcon
            icon={faFolder}
            style={{ color: "#0E0859" }}
            className="w-[7rem] h-[4rem]"
          />
          <p className="mt-2 text-lg font-medium text-blue-900">{folder}</p>
        </div>
      ))}
    </div>
  )}
</div>

            
          </>
        )}

        {/* Editor */}
        {selectedNote && (
          <div className="w-full p-4 bg-blue-200 rounded-md">
            <button
              onClick={() => setSelectedNote(null)}
              className="mb-4 text-blue-700 underline"
            >
              ← Back
            </button>
            <h2 className="text-2xl mb-2">{selectedNote}</h2>
            <textarea
              value={noteContent}
              onChange={(e) => saveNote(e.target.value)}
              className="w-full h-[70vh] border border-gray-300 rounded-md p-4 resize-none"
              placeholder="Write your note here..."
            />
          </div>
        )}
      </div>
    </div>
  )
}


export default NotesPage;
