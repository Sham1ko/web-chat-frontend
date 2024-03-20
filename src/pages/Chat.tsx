import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
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

  const handleSendMessage = (e: any) => {
    e.preventDefault();
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
      <ScrollArea className="p-4 h-full">
        {messages.map((message, index) => (
          <div key={index} className="border-black border-2 mb-2">
            <strong>{message.user}: </strong>
            <span>{message.text}</span>
          </div>
        ))}
      </ScrollArea>
      <Separator className="mt-auto" />
      <div className="p-4">
        <form>
          <div className="flex">
            <Textarea
              className="mr-3"
              placeholder={`Send message...`}
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
            <Button onClick={handleSendMessage} size="sm">
              Send
            </Button>
            <div className="flex items-center"></div>
          </div>
        </form>
      </div>
    </div>
  );
}
