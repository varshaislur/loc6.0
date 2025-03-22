import React, { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";


// Gemini API settings
const API_KEY = process.env.REACT_APP_API_KEY
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// Initial system instruction to guide Gemini's responses
const systemInstruction = `You are an ecommerce webscraping assistant. Help users understand product data, 
compare prices across websites, find the best deals, and understand market trends. 
Format your responses in a structured, easy-to-read manner with clear sections, 
bullet points for features, and price comparisons in tables when appropriate. 
Highlight the best deals and explain why they're good value.`;

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      message: "👋 Hello! I'm your E-commerce Analysis Assistant powered by Gemini. I can help you analyze product data, compare prices, find the best deals, and understand market trends from your scraped data. What would you like to know today?",
      sentTime: "just now",
      sender: "Gemini",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setIsTyping(true);
    await processMessageToGemini(message);
  };

  async function processMessageToGemini(userMessage) {
    // Combine system instruction with user message
    const enhancedMessage = `${systemInstruction}\n\nUser query: ${userMessage}`;
    
    // Preparing request body according to the provided structure
    const apiRequestBody = {
      contents: [{
        parts: [{ text: enhancedMessage }]
      }]
    };

    try {
      // Using the exact endpoint provided
      const response = await fetch(
        `${API_URL}?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiRequestBody),
        }
      );

      const data = await response.json();
      console.log("Gemini API Response:", data);

      // Extract the response text from Gemini
      let geminiResponse = "";
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        // Extract text from parts array
        const parts = data.candidates[0].content.parts;
        if (parts && parts.length > 0) {
          geminiResponse = parts[0].text;
        }
      } else if (data.error) {
        geminiResponse = `Error: ${data.error.message || "Something went wrong"}`;
      } else {
        geminiResponse = "I apologize, but I couldn't process that request.";
      }

      setMessages(prevMessages => [
        ...prevMessages,
        {
          message: geminiResponse,
          sender: "Gemini",
        },
      ]);
    } catch (error) {
      console.error("Error connecting to Gemini API:", error);
      setMessages(prevMessages => [
        ...prevMessages,
        {
          message: "Sorry, there was an error connecting to the Gemini API. Please try again later.",
          sender: "Gemini",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  // Function to format message with markdown
  const formatMessage = (message) => {
    if (typeof message !== 'string') return message;
    
    // Basic markdown-like formatting
    const formattedText = message
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
      .replace(/\n\n/g, '<br/><br/>') // Paragraphs
      .replace(/\n/g, '<br/>') // Line breaks
      .replace(/### (.*?)\n/g, '<h3>$1</h3>') // H3
      .replace(/## (.*?)\n/g, '<h2>$1</h2>') // H2
      .replace(/# (.*?)\n/g, '<h1>$1</h1>') // H1
      .replace(/- (.*?)(?:\n|$)/g, '<li>$1</li>') // List items
      .replace(/<li>(.*?)<\/li>/g, '<ul style="margin: 0px 0px 10px 20px;"><li>$1</li></ul>') // Wrap in ul
      .replace(/<\/ul>\s*<ul[^>]*>/g, ''); // Combine adjacent uls
    
    return <div dangerouslySetInnerHTML={{ __html: formattedText }} />;
  };

  return (
    <div className="App">
      <div
        style={{
          position: "relative",
          height: "700px", // Increased height
          width: "1470px",
          backgroundColor: "#f5f7fa", // Lighter background
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ padding: "15px", borderBottom: "1px solid #e1e5eb", display: "flex", alignItems: "center" }}>
          <div style={{ 
            width: "40px", 
            height: "40px", 
            borderRadius: "50%", 
            backgroundColor: "#4285F4", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            marginRight: "12px",
            color: "white",
            fontWeight: "bold",
            fontSize: "18px"
          }}>G</div>
          <div>
            <h2 style={{ margin: "0", fontSize: "18px", fontWeight: "600" }}>E-commerce Analyst</h2>
            <p style={{ margin: "0", fontSize: "14px", color: "#555" }}>Powered by Gemini AI</p>
          </div>
        </div>
        <MainContainer style={{ border: "none" }}>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={
                isTyping ? (
                  <TypingIndicator content="Analyzing data..." />
                ) : null
              }
            >
              {messages.map((message, i) => {
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      width: "100%",
                      flexDirection: "row",
                      justifyContent:
                        message.sender === "Gemini" ? "start" : "end",
                      borderRadius: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: message.sender === "Gemini" ? "80%" : "fit-content",
                        maxWidth: "85%",
                        backgroundColor: message.sender === "Gemini" ? "#ffffff" : "#E3F2FD",
                        borderRadius: "12px",
                        margin: "10px",
                        padding: "15px",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                        fontSize: "15px",
                        lineHeight: "1.5",
                        color: "#333",
                        border: message.sender === "Gemini" ? "1px solid #e0e0e0" : "none",
                      }}
                    >
                      {message.sender === "Gemini" 
                        ? formatMessage(message.message) 
                        : message.message}
                    </div>
                  </div>
                );
              })}
            </MessageList>
            <MessageInput
              placeholder="Ask about product comparisons, price trends, or best deals..."
              onSend={handleSend}
              style={{ 
                border: "1px solid #e0e0e0", 
                borderRadius: "8px", 
                margin: "10px 15px",
                backgroundColor: "#fff"
              }}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default Chatbot;