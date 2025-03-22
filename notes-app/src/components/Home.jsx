import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPaste } from "../redux/pasteSlice";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams({});
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPaste = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPaste.find((p) => p._id === pasteId);
      setTitle(paste?.title || "");
      setValue(paste?.content || "");
    }
  }, [pasteId]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };
    if (pasteId) {
      dispatch(updateToPaste(paste));
    } else {
      dispatch(addToPastes(paste));
    }
    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      {/* Title Input */}
      <div className="flex gap-4">
        <input
          className="w-full p-3 rounded-lg bg-gray-900 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
          onClick={createPaste}
        >
          {pasteId ? "Update" : "Create"}
        </button>
      </div>

      {/* Text Area */}
      <textarea
        className="w-full mt-5 p-3 rounded-lg bg-gray-900 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        value={value}
        placeholder="Enter text here"
        onChange={(e) => setValue(e.target.value)}
        rows={10}
      />
    </div>
  );
};

export default Home;
