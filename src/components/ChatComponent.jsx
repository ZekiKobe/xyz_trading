import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { MessageCircle, X, Image, Video, Smile, Paperclip, Send } from "lucide-react"; // Ensure this is installed

export default function ChatComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [stickersVisible, setStickersVisible] = useState(false);

  // Refs for file inputs
  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");
  };

  const handleStickerClick = (sticker) => {
    setMessages([...messages, { text: sticker, sender: "user" }]);
    setStickersVisible(false); // Hide stickers after selection
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle the uploaded file (e.g., send it as a message, upload to server, etc.)
      alert(`Uploaded: ${file.name}`);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full p-3 shadow-lg bg-blue-500 text-white transition duration-300 hover:bg-blue-600"
        style={{ background: "#1a5cc7", color: "white" }}
      >
        {isOpen ? <X size={25} /> : <MessageCircle size={25} />}
      </button>

      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="bg-white shadow-xl rounded-2xl w-96 h-96 flex flex-col absolute bottom-12 right-0"
        >
          <div className="flex items-center p-3 bg-blue-600 text-white w-full" style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
            <img src="/profile.png" alt="User Avatar" className="w-10 h-10 rounded-full" />
            <h2 className="text-lg font-semibold" style={{ marginLeft: "10px" }}>XYZ Trading</h2>
          </div>

          {stickersVisible && (
            <div className="absolute z-60 top-12 right-0 bg-white shadow-lg p-2 rounded-lg flex flex-wrap" style={{ width: "200px" }}>
              {["😊", "😂", "😢", "❤️", "😍", "👍", "👎", "🤔", "🎉", "😎"].map((sticker, index) => (
                <button key={index} onClick={() => handleStickerClick(sticker)} className="text-2xl p-1">
                  {sticker}
                </button>
              ))}
            </div>
          )}

          <div className="flex-1 overflow-y-auto max-h-72 space-y-2 mt-2 p-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg max-w-[75%] ${
                  msg.sender === "user" ? "ml-auto bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="border-t pt-2 px-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type a message..."
              style={{ color: "gray" }}
            />
          </div>

          <div className="flex items-center justify-between p-2 border-t mt-2">
            <div className="flex space-x-2">
              <button className="p-2 hover:bg-transparent rounded transition duration-300" onClick={() => setStickersVisible(!stickersVisible)} style={{ background: "transparent", color: "black" }}>
                <Smile size={18} />
              </button>
              <button className="p-2 hover:bg-transparent rounded transition duration-300" onClick={() => imageInputRef.current.click()} style={{ background: "transparent", color: "black" }}>
                <Image size={18} />
              </button>
              <input
                type="file"
                ref={imageInputRef}
                onChange={handleUpload}
                className="hidden"
                accept="image/*"
              />
              <button className="p-2 hover:bg-transparent rounded transition duration-300" onClick={() => fileInputRef.current.click()} style={{ background: "transparent", color: "black" }}>
                <Paperclip size={18} />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleUpload}
                className="hidden"
              />
              <button className="p-2 hover:bg-transparent rounded transition duration-300" onClick={() => videoInputRef.current.click()} style={{ background: "transparent", color: "black" }}>
                <Video size={18} />
              </button>
              <input
                type="file"
                ref={videoInputRef}
                onChange={handleUpload}
                className="hidden"
                accept="video/*"
              />
            </div>
            <button onClick={sendMessage} className="ml-2 p-2 rounded bg-blue-500 text-white transition duration-300 hover:bg-blue-600" style={{ background: "green", color: "white" }}>
              <Send size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}