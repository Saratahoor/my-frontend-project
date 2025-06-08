import { useState } from "react";
import { FaComments, FaTimes } from "react-icons/fa";
import axios from "axios";
import AnimatedResponse from "./AnimatedResponse";

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [animatingIndex, setAnimatingIndex] = useState(null);
  const [chatHistory, setChatHistory] = useState([
    {
      role: "assistant",
      content: "Hello! How can I help you today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleOverlayClick = (e) => {
    // Close only if clicking the overlay (not the modal content)
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      setIsLoading(true);
      const updatedHistory = [
        ...chatHistory,
        { role: "user", content: message.trim() },
      ];
      setChatHistory(updatedHistory);

      // Make API call to backend
      const response = await axios.post(
        "http://localhost:3000/api/chat/query",
        {
          history: updatedHistory,
          message: message.trim(),
        }
      );

      // Add assistant's response and trigger animation
      const newIndex = updatedHistory.length;
      setChatHistory((prev) => [
        ...prev,
        { role: "assistant", content: response.data.reply },
      ]);
      setAnimatingIndex(newIndex);

      // Reset animation after completion
      setTimeout(() => {
        setAnimatingIndex(null);
      }, response.data.reply.split(" ").length * 100 + 500);

      setMessage("");
    } catch (error) {
      console.error("Chat Error:", error);
      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={handleOverlayClick}
        >
          <div className="w-[80%] h-[80%] bg-white rounded-lg shadow-xl border flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              {/* Left side - NyayGPT */}
              <h3 className="font-semibold text-xl">NyayGPT</h3>

              {/* Right side - Microsoft branding and close button */}
              <div className="flex items-center gap-4">
                <div className="flex items-center text-sm text-gray-500">
                  <span className="mr-1">Powered by</span>
                  <img
                    src="/microsoft-logo.png"
                    alt="Microsoft Logo"
                    className="text-blue-500 text-lg mx-1 h-[30px]"
                  />
                  <span className="font-medium text-blue-600">Azure</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 p-2"
                >
                  <FaTimes size={24} />
                </button>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
              <div className="space-y-4">
                {chatHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex items-start ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`rounded-lg p-3 max-w-[80%] ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-blue-100"
                      }`}
                    >
                      {msg.role === "assistant" && index === animatingIndex ? (
                        <AnimatedResponse text={msg.content} />
                      ) : (
                        msg.content
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border-t">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 border rounded-lg px-4 py-3 text-base"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading}
                  className={`px-6 py-3 rounded-lg text-base font-medium text-white ${
                    isLoading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isLoading ? "Sending..." : "Send"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all"
      >
        <FaComments size={24} />
      </button>
    </div>
  );
}

export default ChatBot;
