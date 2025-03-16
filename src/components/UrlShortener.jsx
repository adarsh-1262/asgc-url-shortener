import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiLink } from "react-icons/fi";
import { FaRocket } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import { ToastContainer } from "react-toastify";

const UrlShortener = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleShorten = async () => {
    if (!originalUrl) {
      toast.error("Please enter a URL!");
      return;
    }
    if (!isValidUrl(originalUrl)) {
      toast.error("Invalid URL format!");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/shorten`,
        { originalUrl }
      );
      setShortUrl(`${import.meta.env.VITE_BACKEND_URL}/${res.data.shortUrl}`);
      toast.success("Short URL created successfully!");
    } catch (error) {
      toast.error("Failed to shorten URL!");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    toast.info("Short URL copied!");
  };

  return (
    <div className="min-h-screen h-full w-full ">

      {/* Main Content */}
      <main className="flex items-center justify-center p-6">
        {/* Main Card */}
        <div className="w-full max-w-2xl bg-white/[0.08] backdrop-blur-lg rounded-3xl shadow-lg border border-white/[0.12] p-8 md:p-10 text-center space-y-6 relative z-10">
          {/* Card Header */}
          <div className="p-6">
              <div className="inline-flex items-center gap-4 p-6 mb-6 rounded-3xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-white/[0.1]">
              <h1 className="text-3xl font-bold mb-4">🔗 URL Shortener</h1>
              </div>
              <p className="text-white/70 text-lg">
                Convert your long URLs into short, shareable links.
              </p>
            </div>

          {/* Input Field */}
          <div className="relative group mt-10 flex flex-col items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300 mb-4" ></div>
            <input
              type="text"
              placeholder="Paste your long URL here..."
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              className="relative  w-full px-8 py-7 bg-white/[0.05] border border-white/[0.2] rounded-2xl text-white text-xl placeholder-white/50 focus:outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300"
            />
          </div>

          {/* Shorten Button */}
          <button
            onClick={handleShorten}
            disabled={isLoading}
            className="relative w-full group mt-6 px-8 py-7"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur opacity-50 group-hover:opacity-70 transition duration-300"></div>
            <div className="relative w-full mt-6 px-12 py-8 bg-gradient-to-r from-purple-800 to-blue-500 text-white text-2xl font-semibold rounded-2xl flex items-center justify-center gap-4 group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform group-hover:-translate-y-1 group-active:translate-y-0">
              {isLoading ? (
                <div className="flex flex-col items-center mt-6 gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 border-4 border-white/20 rounded-full"></div>
                    <div className="w-10 h-10 border-4 border-white rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
                  </div>
                  <span className="text-lg animate-pulse">Processing...</span>
                </div>
              ) : (
                <>
                  <FaRocket className="text-3xl mt-6" />
                  <span>Shorten URL</span>
                </>
              )}
            </div>
          </button>

          {/* Shortened URL Display */}
          {shortUrl && (
            <div className="animate-fade-in space-y-6 mt-6">
              <div className="p-5 rounded-2xl bg-white/[0.06] border border-white/[0.2] flex items-center gap-8">
                <h2 className="text-white/70 whitespace-nowrap mt-4 mb-0">Shortened URL:</h2>
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-white text-lg truncate hover:text-purple-400 transition-colors duration-300"
                >
                  {shortUrl}
                </a>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-xl transition-all duration-300 whitespace-nowrap"
                >
                  <MdContentCopy className="text-purple-400 text-xl" />
                  <span className="text-white">Copy</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center bg-white/[0.03] backdrop-blur-sm border-t border-white/[0.08] relative z-10">
        <p className="text-white/50 text-lg">
          Make sharing links easy with our short URL generator ✨
        </p>
      </footer>

      <ToastContainer 
        position="top-center" 
        theme="dark"
        className="z-50" 
      />
    </div>
  );
};

export default UrlShortener;
