import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UrlShortener = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = async () => {
    if (!originalUrl) {
        toast.error("Please enter a URL!");
        return;
    }

    try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/shorten`, { originalUrl });
        
        setShortUrl(`${import.meta.env.VITE_BACKEND_URL}/${res.data.shortUrl}`);
        toast.success("Short URL created successfully!");
    } catch (error) {
        toast.error("Failed to shorten URL!");
    }
};

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    toast.info("Short URL copied!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">🔗 URL Shortener</h1>
      <input
        type="text"
        placeholder="Enter URL..."
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        className="w-full max-w-md p-2 border border-gray-300 rounded-md"
      />
      <button onClick={handleShorten} className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Shorten URL
      </button>

      {shortUrl && (
        <div className="mt-4 p-2 bg-white shadow rounded-md flex items-center">
          <input type="text" value={shortUrl} readOnly className="px-2 py-1 border-none" />
          <button onClick={copyToClipboard} className="ml-2 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600">
            Copy
          </button>
        </div>
      )}
    </div>
  );
};

export default UrlShortener;
