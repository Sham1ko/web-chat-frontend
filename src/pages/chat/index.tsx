import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks";
import { useEffect, useState } from "react";
import io from "socket.io-client";

export default function ChatPage() {
  const [socket, setSocket] = useState<any>(null);
  const [messages, setMessages] = useState<any>([]);
  const [messageInput, setMessageInput] = useState("");

  const { signOut, user } = useAuth();

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

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    if (messageInput.trim() !== "") {
      socket.emit("message", { messageInput, user: user?.username });
      setMessageInput("");
    }
  };

  return (
    <div className="flex h-screen flex-col">
      <div className="flex min-h-[60px] items-center px-4 py-2">
        Username: <span className="font-semibold">{user?.username}</span>
      </div>
      <Separator />
      <ScrollArea className="p-4">
        {messages.map((message: any, index: any) => (
          <div key={index} className="border-1 mb-2">
            <strong>{message.user}: </strong>
            <span>{message.text}</span>
          </div>
        ))}
      </ScrollArea>
      <Separator className="mt-auto" />
      <div className="p-4">
        <form>
          <div className="flex w-full items-center space-x-2">
            <Input
              type="text"
              placeholder="Enter your message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
