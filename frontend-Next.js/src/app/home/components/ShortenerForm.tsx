"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";

const ShortenerForm = () => {
  const [url, setUrl] = useState("");
  const router = useRouter();
  
  const { user, isAuthenticated } = useAuthContext(); 

  const handleShorten = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    console.log("Shortening URL for user:", user?.email, url);
  };

  const isInputEmpty = url.trim() === "";

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
        disabled={isInputEmpty}
        className={`px-6 rounded-lg font-semibold transition ${
          isInputEmpty 
            ? "bg-gray-400 cursor-not-allowed text-gray-200" 
            : "bg-blue-600 text-white cursor-pointer hover:bg-blue-700"
        }`}
      >
        Shorten
      </button>
    </div>
  );
};

export default ShortenerForm;