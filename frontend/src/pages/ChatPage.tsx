import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { useApp } from "../store/Context";
import type { Message, User } from "../lib/type/type";

const ChatPage = () => {
  const socket = io("http://localhost:5000");

  const { user, getCustomers, customers } = useApp();

  const [selectedCustomer, setSelectedCustomer] = useState<User | null>(
    customers[0]
  );
  const [messages, setMessages] = useState<Message[]>([]);

  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getCustomers();
  }, []);

  useEffect(() => {
    if (user) {
      socket.emit("join", { userId: user._id, role: "Admin" });
    }
    socket.on("chatMessage", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => {
      socket.off("chatMessage");
    };
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (input.trim() && user && selectedCustomer) {
      socket.emit("chatMessage", {
        from: user._id,
        fromModel: "Admin",
        to: selectedCustomer._id,
        toModel: "User",
        message: input,
      });
      setMessages((prev) => [...prev, { from: user._id, message: input }]);
      setInput("");
    }
  };

  return (
    <div className="flex h-[500px] bg-white rounded-lg shadow-lg">
      {/* Left: Admin List */}
      <div className="w-1/3 border-r bg-gray-50 p-4">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Customers</h2>
        <ul className="space-y-2">
          {customers.map((customer) => (
            <li
              key={customer._id}
              className={`p-3 rounded-lg cursor-pointer flex items-center gap-2 transition-colors font-medium text-gray-700 hover:bg-orange-100 ${
                selectedCustomer?._id === customer?._id
                  ? "bg-orange-200 text-orange-700"
                  : ""
              }`}
              onClick={() => setSelectedCustomer(customer)}
            >
              <span className=" w-8 h-8 bg-orange-300 rounded-full flex items-center justify-center text-white font-bold">
                {customer.name.charAt(0)}
              </span>
              {customer.name}
            </li>
          ))}
        </ul>
      </div>
      {/* Right: Chat Interface */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b bg-white">
          <div className="flex items-center gap-3">
            <span className=" w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {selectedCustomer?.name?.charAt(0)}
            </span>
            <span className="font-semibold text-gray-800 text-lg">
              {selectedCustomer?.name}
            </span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4 bg-gray-50">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex mb-2 ${
                msg.from === user?._id ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg shadow text-sm ${
                  msg.from === user?._id
                    ? "bg-orange-500 text-white"
                    : "bg-white border text-gray-800"
                }`}
              >
                {msg.message}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="px-6 py-4 border-t bg-white flex items-center gap-2">
          <input
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
          />
          <button
            className="bg-orange-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
