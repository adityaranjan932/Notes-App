import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromPaste } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes); // ✅ UI now updates properly
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  // 🔥 Make sure pastes are correctly filtered
  const filterData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPaste(pasteId)); // ✅ This now updates UI
  }

  function handleShare(paste) {
    if (navigator.share) {
      navigator
        .share({ title: paste.title, text: paste.content })
        .then(() => toast.success("Shared successfully!"))
        .catch(() => toast.error("Sharing failed!"));
    } else {
      toast.error("Sharing not supported in this browser.");
    }
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      {/* Search Input */}
      <input
        className="w-full p-3 rounded-lg bg-gray-900 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        type="text"
        value={searchTerm}
        placeholder="Search Paste"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Paste List */}
      <div className="mt-5">
        {filterData.length > 0 ? (
          filterData.map((paste) => (
            <div key={paste._id} className="bg-gray-900 p-4 rounded-lg mt-4 shadow-md">
              <h2 className="text-lg font-semibold">{paste.title}</h2>
              <p className="text-gray-400 text-sm">{paste.content}</p>
              <div className="flex gap-3 mt-3 flex-wrap">
                <NavLink
                  to={`/?pasteId=${paste._id}`}
                  className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                >
                  Edit
                </NavLink>
                <NavLink
                  to={`/pastes/${paste._id}`}
                  className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition"
                >
                  View
                </NavLink>
                <button
                  onClick={() => handleDelete(paste._id)}
                  className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste.content);
                    toast.success("Copied to clipboard");
                  }}
                  className="px-4 py-2 bg-yellow-600 rounded-lg hover:bg-yellow-700 transition"
                >
                  Copy
                </button>
                <button
                  onClick={() => handleShare(paste)}
                  className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
                >
                  Share
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Created at: {new Date(paste.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 mt-5">No pastes found.</p>
        )}
      </div>
    </div>
  );
};

export default Paste;
