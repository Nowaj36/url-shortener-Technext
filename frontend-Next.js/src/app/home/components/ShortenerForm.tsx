"use client";
import { useState } from "react";

const ShortenerForm = () => {
  const [url, setUrl] = useState("");

  const handleShorten = () => {
    console.log("Shortening URL:", url);
    // Add URL shortening logic here
  };

  return (
    <div className="mt-8 bg-gray-100 p-4 rounded-xl flex gap-3">
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste a long URL here"
        className="flex-1 px-4 py-3 rounded-lg border focus:outline-none text-black"
      />
      <button 
        onClick={handleShorten}
        className="bg-blue-600 text-white px-6 rounded-lg font-semibold cursor-pointer hover:bg-blue-700 transition"
      >
        Shorten
      </button>
    </div>
  );
};

export default ShortenerForm;