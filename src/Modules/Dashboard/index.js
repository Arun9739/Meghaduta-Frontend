import { useEffect, useRef, useState } from "react";
import Img1 from "../../Assets/avatar.png";
import Avatar1 from "../../Assets/avatar2.png";
import Avatar2 from "../../Assets/avatar3.png";
import Input from "../../Components/Input";
import { io } from "socket.io-client";
 
const Dashboard = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user:detail"))
  );
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState({});
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const messageRef = useRef(null);

  useEffect(() => {
    //setSocket(io("http://localhost:8080"));
    //setSocket(io("http://localhost:5000"));
    setSocket(io("https://meghaduta-server.onrender.com"));
  }, []);

  useEffect(() => {
    socket?.emit("addUser", user?.id);
    socket?.on("getUsers", (users) => {
      console.log("activeUsers :>> ", users);
    });
    socket?.on("getMessage", (data) => {
      setMessages((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          { user: data.user, message: data.message },
        ],
      }));
    });
  }, [socket]);

  useEffect(() => {
    messageRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages?.messages]);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user:detail"));
    const fetchConversations = async () => {
      const res = await fetch(
        `https://meghaduta-server.onrender.com/api/conversations/${loggedInUser?.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resData = await res.json();
      setConversations(resData);
    };
    fetchConversations();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`https://meghaduta-server.onrender.com/api/users/${user?.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await res.json();
      setUsers(resData);
    };
    fetchUsers();
  }, []);

  const fetchMessages = async (conversationId, receiver) => {
    const res = await fetch(
      `https://meghaduta-server.onrender.com/api/message/${conversationId}?senderId=${user?.id}&&receiverId=${receiver?.receiverId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const resData = await res.json();
    setMessages({ messages: resData, receiver, conversationId });
  };

  const sendMessage = async (e) => {
    setMessage("");
    socket?.emit("sendMessage", {
      senderId: user?.id,
      receiverId: messages?.receiver?.receiverId,
      message,
      conversationId: messages?.conversationId,
    });
    const res = await fetch(`https://meghaduta-server.onrender.com/api/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversationId: messages?.conversationId,
        senderId: user?.id,
        message,
        receiverId: messages?.receiver?.receiverId,
      }),
    });
  };

  return (
    <div className="w-screen flex">
      <div className="w-[25%] h-screen bg-secondary overflow-scroll">
        <div className="flex items-center my-8 mx-14">
          <div>
            <img
              src={Avatar2}
              width={75}
              height={75}
              className="border border-primary p-[2px] rounded-full"
              alt="Profile"
            />
          </div>
          <div className="ml-8">
            <h3 className="text-2xl">{user?.fullName}</h3>
            <p className="text-lg font-light">My Account</p>
          </div>
        </div>
        <hr className="mx-14" />
        <div className="mx-14 mt-10">
          <div className="text-primary mb-3 font-bold font-mono text-3xl text-center">
            Messages
          </div>
          <div>
            {conversations.length > 0 ? (
              conversations.map(({ conversationId, user }) => (
                <div
                  key={conversationId}
                  className="group flex items-center py-4 border-b border-b-gray-300 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  <div
                    className="cursor-pointer flex items-center group-hover:bg-[#E73EF5] group-hover:text-white rounded-md p-4 w-full"
                    onClick={() => fetchMessages(conversationId, user)}
                  >
                    <div>
                      <img
                        src={Avatar1}
                        className="w-[60px] h-[60px] rounded-full p-[2px] border group-hover:border-white border-primary"
                        alt={user.fullName}
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">
                        {user?.fullName}
                      </h3>
                      <p className="text-sm font-light ">{user?.email}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-lg font-semibold mt-24">
                No Conversations
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-[50%] h-screen bg-white flex flex-col items-center">
        {messages?.receiver?.fullName && (
          <div className="w-[75%] bg-secondary h-[80px] my-14 rounded-full flex items-center px-14 py-2">
            <div className="cursor-pointer">
              <img src={Avatar1} width={60} height={60} className="rounded-full" />
            </div>
            <div className="ml-6 mr-auto">
              <h3 className="text-lg">{messages?.receiver?.fullName}</h3>
              <p className="text-sm font-light text-gray-600">
                {messages?.receiver?.email}
              </p>
            </div>
            <div className="cursor-pointer flex">
              <svg
                class="icon icon-tabler icon-tabler-phone-outgoing mr-5"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="black"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                <line x1="15" y1="9" x2="20" y2="4" />
                <polyline points="16 4 20 4 20 8" />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            </div>
          </div>
        )}
        <div className="h-[75%] w-full overflow-scroll shadow-sm">
          <div className="p-14">
            {messages?.messages?.length > 0 ? (
              messages.messages.map(({ message, user: { id } = {} }) => {
                return (
                  <>
                    <div
                      className={`max-w-[40%] rounded-b-xl p-4 mb-6 ${
                        id === user?.id
                          ? "bg-primary text-white rounded-tl-xl ml-auto"
                          : "bg-[#FBCABC] rounded-tr-xl"
                      } `}
                    >
                      {message}
                    </div>
                    <div ref={messageRef}></div>
                  </>
                );
              })
            ) : (
              <div className="text-center text-lg font-semibold mt-24">
                Select a person and send a message to start conversation
              </div>
            )}
          </div>
        </div>
        {messages?.receiver?.fullName && (
          <div className="p-14 w-full flex items-center">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)} 
              className="w-[75%]"
              inputClassName="p-4 border-0 shadow-md rounded-full bg-light focus:ring-0 focus:border-0 outline-none"
            />
            <div
              className={`ml-4 p-2 cursor-pointer bg-light hover:bg-primary rounded-full ${
                !message && "pointer-events-none"
              }`}
              onClick={() => sendMessage()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-send"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#2c3e50"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="10" y1="14" x2="21" y2="3" />
                <path d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5" />
              </svg>
            </div>
            <div
              className={`ml-4 p-2 cursor-pointer bg-light hover:bg-primary rounded-full ${
                !message && "pointer-events-none"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
      <div className="w-[25%] h-screen bg-light px-8 py-16 overflow-scroll">
        <div className="text-primary text-3xl mb-8 font-mono font-bold text-center">
          People
        </div>
        <div>
          {users.length > 0 ? (
            users.map(({ userId, user }) => (
              <div
                key={userId}
                className="group flex items-center py-4 border-b border-b-gray-300 transition duration-300 ease-in-out transform hover:scale-105"
              >
                <div
                  className="cursor-pointer flex items-center group-hover:bg-primary group-hover:text-white rounded-md p-4 w-full"
                  onClick={() => fetchMessages("new", user)}
                >
                  <div>
                    <img
                      src={Avatar1}
                      className="w-[60px] h-[60px] rounded-full p-[2px] border border-primary group-hover:border-white"
                      alt={user.fullName}
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold">{user?.fullName}</h3>
                    <p className="text-sm font-light ">{user?.email}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-lg font-semibold mt-24">
              No Conversations
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
