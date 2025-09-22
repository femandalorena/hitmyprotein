import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Button from "../Button";
import "../../styles/Tracker.css";
import { sendMessageToLLM } from "../../utils/llms";

function TrackerModal({ onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hola! dime qué comes y te ayudaré a calcular las proteínas de esa comida",
      type: "assistant",
    },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input, type: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Pass conversation so far to the model
    const llmResponse = await sendMessageToLLM([...messages, userMessage]);
    const assistantMessage = {
      id: Date.now() + 1,
      text: llmResponse,
      type: "assistant",
    };
    setMessages((prev) => [...prev, assistantMessage]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="modal-backdrop">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fullscreen-modal"
      >
        <div className="tracker-header">
          <div className="tracker-title">Tracker</div>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="tracker-chat">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat-bubble ${
                msg.type === "user" ? "chat-user" : "chat-assistant"
              }`}
            >
              {msg.type === "assistant" ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {msg.text}
                </ReactMarkdown>
              ) : (
                msg.text
              )}
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </div>

        <div className="tracker-input-row">
          <input
            type="text"
            placeholder="Escribe tu comida..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="input-field"
          />
          <Button onClick={handleSend} type="general">
            Enviar
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default TrackerModal;
