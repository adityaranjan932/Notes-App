import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewPaste = () => {
  const { id } = useParams();
  const allPaste = useSelector((state) => state.paste.pastes);
  const paste = allPaste.find((p) => p._id === id);

  if (!paste) {
    return (
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-800 text-white rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-semibold">Paste Not Found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      {/* Title & Date */}
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <input
          className="w-full sm:w-3/4 p-3 rounded-lg bg-gray-900 border border-gray-600 text-white focus:outline-none"
          type="text"
          value={paste.title}
          disabled
        />
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <span className="text-gray-400 text-sm">
            {new Date(paste.createdAt || Date.now()).toLocaleString()}
          </span>
          <div className="px-3 py-1 bg-gray-700 text-gray-300 rounded-lg text-xs">
            View Only
          </div>
        </div>
      </div>

      {/* Paste Content */}
      <textarea
        className="w-full mt-5 p-3 rounded-lg bg-gray-900 border border-gray-600 text-white focus:outline-none"
        value={paste.content}
        disabled
        rows={10}
      />
    </div>
  );
};

export default ViewPaste;
