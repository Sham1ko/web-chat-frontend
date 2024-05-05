import { ScrollArea } from "./ui/scroll-area";

const chats = [
  {
    id: 1,
    name: "John Doe",
    lastMessage: "Hello",
    time: "10:00 AM",
    avatar: "https://api.multiavatar.com/JognDoe.png",
    status: "online",
  },
  {
    id: 2,
    name: "Jane Doe",
    lastMessage: "Hi",
    time: "11:00 AM",
    avatar: "https://api.multiavatar.com/JaneDoe.png",
    status: "offline",
  },
  {
    id: 3,
    name: "Alice",
    lastMessage: "Hey",
    time: "12:00 PM",
    avatar: "https://api.multiavatar.com/Alice.png",
    status: "online",
  },
  {
    id: 4,
    name: "Bob",
    lastMessage: "Yo",
    time: "1:00 PM",
    avatar: "https://api.multiavatar.com/Bob.png",
    status: "offline",
  },
  {
    id: 5,
    name: "Charlie",
    lastMessage: "Hola",
    time: "2:00 PM",
    avatar: "https://api.multiavatar.com/Charlie.png",
    status: "online",
  },
  {
    id: 6,
    name: "David",
    lastMessage: "Bonjour",
    time: "3:00 PM",
    avatar: "https://api.multiavatar.com/David.png",
    status: "offline",
  },
  {
    id: 7,
    name: "Eve",
    lastMessage: "Ciao",
    time: "4:00 PM",
    avatar: "https://api.multiavatar.com/Eve.png",
    status: "online",
  },
  {
    id: 8,
    name: "Frank",
    lastMessage: "Salut",
    time: "5:00 PM",
    avatar: "https://api.multiavatar.com/Frank.png",
    status: "offline",
  },
  {
    id: 9,
    name: "Grace",
    lastMessage: "Hallo",
    time: "6:00 PM",
    avatar: "https://api.multiavatar.com/Grace.png",
    status: "online",
  },
  {
    id: 10,
    name: "Harry",
    lastMessage: "Namaste",
    time: "7:00 PM",
    avatar: "https://api.multiavatar.com/Harry.png",
    status: "offline",
  },
  {
    id: 11,
    name: "Ivy",
    lastMessage: "Salaam",
    time: "8:00 PM",
    avatar: "https://api.multiavatar.com/Ivy.png",
    status: "online",
  },
  {
    id: 12,
    name: "Jack",
    lastMessage: "Konnichiwa",
    time: "9:00 PM",
    avatar: "https://api.multiavatar.com/Jack.png",
    status: "offline",
  },
  {
    id: 13,
    name: "Kathy",
    lastMessage: "Annyeong",
    time: "10:00 PM",
    avatar: "https://api.multiavatar.com/Kathy.png",
    status: "online",
  },
  {
    id: 14,
    name: "Liam",
    lastMessage: "Ni Hao",
    time: "11:00 PM",
    avatar: "https://api.multiavatar.com/Liam.png",
    status: "offline",
  },
  {
    id: 15,
    name: "Mia",
    lastMessage: "Konnichiwa",
    time: "12:00 AM",
    avatar: "https://api.multiavatar.com/Mia.png",
    status: "online",
  },
  {
    id: 16,
    name: "Noah",
    lastMessage: "Namaste",
    time: "1:00 AM",
    avatar: "https://api.multiavatar.com/Noah.png",
    status: "offline",
  },
  {
    id: 17,
    name: "Olivia",
    lastMessage: "Salaam",
    time: "2:00 AM",
    avatar: "https://api.multiavatar.com/Olivia.png",
    status: "online",
  },
  {
    id: 18,
    name: "Peter",
    lastMessage: "Konnichiwa",
    time: "3:00 AM",
    avatar: "https://api.multiavatar.com/Peter.png",
    status: "offline",
  },
  {
    id: 19,
    name: "Quinn",
    lastMessage: "Annyeong",
    time: "4:00 AM",
    avatar: "https://api.multiavatar.com/Quinn.png",
    status: "online",
  },
  {
    id: 20,
    name: "Rose",
    lastMessage: "Ni Hao",
    time: "5:00 AM",
    avatar: "https://api.multiavatar.com/Rose.png",
    status: "offline",
  },
];

export default function RecentChats() {
  const handleScrollAreaLoad = () => {
    const scrollArea = document.querySelector(".your-scroll-area-class");
    if (scrollArea) {
      scrollArea.scrollTo(0, scrollArea.scrollHeight);
      // scrollArea.scrollTop = scrollArea.scrollHeight - scrollArea.clientHeight;
    }
  };
  const handleScrollAreaScroll = () => {
    const scrollArea = document.querySelector(".your-scroll-area-class");
  };

  return (
    <ScrollArea
      className="h-[85%] your-scroll-area-class"
      onLoad={handleScrollAreaLoad}
      onScroll={handleScrollAreaScroll}
    >
      {chats.map((chat) => (
        <div key={chat.id} className="p-4 border-b border-gray-200 ">
          <a href="#" className="flex items-center ">
            <img
              src={chat.avatar}
              alt={chat.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{chat.name}</p>
                <p className="text-sm text-gray-500">{chat.time}</p>
              </div>
              <p className="text-sm text-gray-500">{chat.lastMessage}</p>
            </div>
          </a>
        </div>
      ))}
    </ScrollArea>
  );
}
