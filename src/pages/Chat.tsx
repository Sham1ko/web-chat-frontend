import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Archive } from "lucide-react";
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
    <div className="flex h-screen flex-col">
      <div className="flex items-center p-2">
        <div className="flex items-center gap-2 text-sm">
          <div className="grid gap-1">
            <div className="font-semibold">{socket?.id}</div>
            <div className="line-clamp-1 text-xs">
              <span className="font-medium">Reply-To:</span> sd
            </div>
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Archive className="h-4 w-4" />
                <span className="sr-only">Archive</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Archive</TooltipContent>
          </Tooltip>
        </div>
      </div>
      <Separator />
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
