import React, { useEffect, useState } from "react";
import Avatar from "../../Assets/avatar.png";
import Input from "../../Components/Input";
import { io } from "socket.io-client";

function Dashboard() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user:detail"))
  );
  const [conversations, setConversation] = useState([]);

  const [messages, setMessages] = useState({});

  const [message, setMessage] = useState("");

  const [users, setUsers] = useState(JSON.parse(localStorage.getItem("user:detail")));

  const [socket, setSocket] = useState(null);

  console.log("user :>> ", user);
  console.log("conversations :>> ", conversations);
  console.log("messages :>> ", messages);
  console.log("users :>> ", users);

  useEffect(() => {
    setSocket(io("http://localhost:8080"));
  }, []);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user:detail"));
    const fetchConversation = async () => {
      const response = await fetch(
        `http://localhost:5000/api/conversations/${loggedInUser?.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setConversation(data);
    };
    fetchConversation();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`http://localhost:5000/api/users/${user?.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const fetchMessages = async (conversationId, receiver) => {
    const res = await fetch(
      `http://localhost:5000/api/message/${conversationId}?senderId=${receiver?.id}&&receiverId=${receiver?.receiverId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
    const resData = await res.json();
    console.log("resData :>> ", resData);
    setMessages({ messages: resData, receiver, conversationId });
  };

  const sendMessage = async () => {
    console.log('messages :>> ', messages, messages?.conversationId, user?.id, messages?.receiver?.receiverId);
    const res = await fetch(`http://localhost:5000/api/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversationId: messages?.conversationId,
        senderId: user?.id,
        message: messages?.text,
        receiverId: messages?.receiver?.receiverId
      }),
    });
    //clear the text field of message
    setMessages({ ...messages, text: "" });
  };

  return (
    <div className="w-screen flex ">
      <div className="w-[25%] h-screen  bg-secondary">
        <div className="flex items-center my-8 mx-14">
          <div className="border border-primary p-[4px] rounded-full">
            <img src={Avatar} alt="profile" width={65} height={65} />
          </div>
          <div className="ml-8">
            <h3 className="text-2xl">{user?.fullName}</h3>
            <p className="text-lg font-light">My account</p>
          </div>
        </div>
        <hr />

        <div className="mx-14 mt-10 ">
          <div className="text-primary text-lg ml-10">Messages</div>
          <div className="">
            {conversations.length > 0 ? (
              conversations.map(({ conversationId, user }) => {
                return (
                  <div className="flex items-center py-8 border-b border-b-gray-300">
                    <div
                      className="cursor-pointer flex items-center"
                      onClick={() => fetchMessages(conversationId, user)}
                    >
                      <div className="p-[4px] rounded-full">
                        <img
                          src={Avatar}
                          alt="profile"
                          width={60}
                          height={60}
                        />
                      </div>
                      <div className="ml-6">
                        <h3 className="text-lg font-semibold">
                          {user?.fullName}
                        </h3>
                        <p className="text-sm font-light text-gray-600">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-lg font-semibold mt-24">
                No conversations{" "}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-[50%] h-screen bg-white flex flex-col items-center">
        {messages?.receiver?.fullName && (
          <div className="w-[75%] bg-[#DBF3FC] h-[80px] my-14 rounded-full flex items-center">
            <div className="cursor-pointer ml-1">
              <img src={Avatar} width={50} height={50} />
            </div>
            <div className="ml-6 mr-auto">
              <h3 className="text-lg ">{messages?.receiver?.fullName}</h3>
              <p className="text-sm font-light text-gray-600">
                {messages?.receiver?.email}
              </p>
            </div>
            <div className="cursor-pointer mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-phone-outgoing"
                width="35s"
                height="35"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#2c3e50"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                <path d="M15 9l5 -5" />
                <path d="M16 4l4 0l0 4" />
              </svg>
            </div>
          </div>
        )}
        <div className="h-[75%] w-full overflow-scroll shadow-sm">
          <div className="p-14">
            {messages?.messages?.length > 0 ? (
              messages.messages.map(({ message, user: { id } = {} }) => {
                return (
                  <div
                    className={`max-w-[40%] rounded-b-xl p-4 mb-6 ${
                      id === user?.id
                        ? "bg-primary text-white rounded-tl-xl ml-auto"
                        : "bg-yellow-500 rounded-tr-xl"
                    } `}
                  >
                    {message}
                  </div>
                );
              })
            ) : (
              <div className="text-center text-lg font-semibold mt-24">
                {" "}
                No Messages or no conversations selected{" "}
              </div>
            )}
          </div>
        </div>
        {messages?.receiver?.fullName && (
          <div className="p-14 w-full flex items-center">
            <Input
              placeholder="Type a message..."
              className="w-full"
              value={messages?.text || ""}
              // onChange={(e) => setMessages(e.target.value)}
              onChange={(e) =>
                setMessages({ ...messages, text: e.target.value })
              }
              inputClassName="p-2 border-0 shadow-md rounded-full bg-light focus:ring-0 focus:border-0 outline-none"
            />
            <div
              className={`ml-4 p-2 cursor-pointer bg-light rounded-full ${
                !messages && "pointer-events-none"
              }`}
              onClick={() => sendMessage()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-send"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#2c3e50"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 14l11 -11" />
                <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
              </svg>
            </div>
            <div
              className={`ml-4 p-2 cursor-pointer bg-light rounded-full ${
                !messages && "pointer-events-none"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-paperclip"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#2c3e50"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a3 3 0 0 0 -6 -6l-6.5 6.5a4.5 4.5 0 0 0 9 9l6.5 -6.5" />
              </svg>
            </div>
          </div>
        )}
      </div>
      <div className="w-[25%] h-screen bg-light">
        <div className="text-primary text-lg ">People</div>
        {users.length > 0 ? (
          users.map(( {userId, user} ) => {
            console.log("user structure ", user);
            return (
              <div className="flex items-center py-8 border-b border-b-gray-300">
                <div
                  className="cursor-pointer flex items-center"
                  onClick={() => fetchMessages("new", user)}
                >
                  <div className="p-[4px] rounded-full">
                    <img src={Avatar} alt="profile" width={60} height={60} />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-lg font-semibold">{user?.fullName}</h3>
                    <p className="text-sm font-light text-gray-600">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-lg font-semibold mt-24">
            No users{" "}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
