import React, { useState, useEffect, useRef } from "react";
import api from "../../api";
import { Button } from "../ui/button";
import "./ScienceChat.css";
import { LuSend, LuBot, LuUser } from "react-icons/lu";

const ScienceChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const userId = useState(
    "user-" + Math.random().toString(36).substring(2, 9)
  );
  const messagesEndRef = useRef(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load chat history when component mounts
  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        const response = await api.get(`/chat/history/${userId}`);
        if (response.data && response.data.length > 0) {
          const formattedMessages = response.data
            .map((interaction) => [
              { text: interaction.user_message, sender: "user" },
              { text: interaction.ai_response, sender: "ai" },
            ])
            .flat();
          setMessages(formattedMessages);
        }
      } catch (error) {
        console.error("Error loading chat history:", error);
      }
    };

    loadChatHistory();
  }, [userId]);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = input.trim();
    setInput("");

    // Add user message to chat
    setMessages((prev) => [...prev, { text: userMessage, sender: "user" }]);

    // Set loading state
    setLoading(true);

    try {
      // Send message to API
      const response = await api.post("/chat", {
        user_message: userMessage,
        user_id: userId,
      });

      // Add AI response to chat
      setMessages((prev) => [
        ...prev,
        { text: response.data.response, sender: "ai" },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.",
          sender: "ai",
          error: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="science-chat-container">
      <div className="chat-header">
        <h1>Chat Científico</h1>
        <p>Converse com nossa IA especializada em ciências</p>
      </div>

      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="welcome-message">
            <LuBot className="bot-icon" />
            <h2>Olá! Sou o assistente científico.</h2>
            <p>
              Estou aqui para responder suas perguntas sobre ciência, explicar
              conceitos científicos e ajudar com seus estudos. O que você
              gostaria de saber hoje?
            </p>
            <div className="suggestion-chips">
              <button
                onClick={() => setInput("O que é a teoria da relatividade?")}
              >
                Teoria da relatividade
              </button>
              <button onClick={() => setInput("Como funciona a fotossíntese?")}>
                Fotossíntese
              </button>
              <button onClick={() => setInput("Explique o ciclo da água")}>
                Ciclo da água
              </button>
              <button onClick={() => setInput("O que são células-tronco?")}>
                Células-tronco
              </button>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.sender === "user" ? "user-message" : "ai-message"
              } ${message.error ? "error-message" : ""}`}
            >
              <div className="message-icon">
                {message.sender === "user" ? <LuUser /> : <LuBot />}
              </div>
              <div className="message-content">{message.text}</div>
            </div>
          ))
        )}

        {loading && (
          <div className="message ai-message loading-message">
            <div className="message-icon">
              <LuBot />
            </div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Digite sua pergunta científica..."
          rows="3"
          disabled={loading}
        />
        <Button
          onClick={handleSendMessage}
          disabled={input.trim() === "" || loading}
          loading={loading}
          bg="#3c6b22ff"
          color="#f4f4f4"
          className="send-button"
        >
          <LuSend />
          Enviar
        </Button>
      </div>
    </div>
  );
};

export default ScienceChat;
