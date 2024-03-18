import { useEffect, useState } from "react";
import io from "socket.io-client";

export default function ChatPage() {
  const [socket, setSocket] = useState<any>(null);
  const [messages, setMessages] = useState<any>([]);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    const newSocket: any = io("localhost:3000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("message", (message: any) => {
        setMessages((prevMessages: any) => [...prevMessages, message]);
      });

      socket.emit("getMessageHistory");
      socket.on("messageHistory", (history: any) => {
        setMessages(history);
      });
    }
  }, [socket]);

  const handleSendMessage = () => {
    if (messageInput.trim() !== "") {
      socket.emit("message", messageInput);
      setMessageInput("");
    }
  };

  return (
    <div>
      <h1>Chat App</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.user}: </strong>
            <span>{message.text}</span>
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}
