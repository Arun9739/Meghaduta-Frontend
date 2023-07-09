import React from "react";
import Avatar from "../../Assets/avatar.png";
import Input from "../../Components/Input";

function Dashboard() {
  const contacts = [
    {
      name: "Arun",
      status: "online",
      img: Avatar,
    },
    {
      name: "John",
      status: "online",
      img: Avatar,
    },
    {
      name: "Ashok",
      status: "online",
      img: Avatar,
    },
  ];
  return (
    <div className="w-screen flex ">
      <div className="w-[25%] h-screen  bg-secondary">
        <div className="flex items-center my-8 mx-14">
          <div className="border border-primary p-[4px] rounded-full">
            <img src={Avatar} alt="profile" width={65} height={65} />
          </div>
          <div className="ml-8">
            <h3 className="text-2xl">Arun chat app</h3>
            <p className="text-lg font-light">My account</p>
          </div>
        </div>
        <hr />

        <div className="mx-14 mt-10 ">
          <div className="text-primary text-lg ml-10">Messages</div>
          <div className="">
            {contacts.map(({ name, status, img }) => {
              return (
                <div className="flex items-center py-8 border-b border-b-gray-300">
                  <div className="cursor-pointer flex items-center">
                    <div className="p-[4px] rounded-full">
                      <img src={img} alt="profile" width={60} height={60} />
                    </div>
                    <div className="ml-6">
                      <h3 className="text-lg font-semibold">{name}</h3>
                      <p className="text-sm font-light text-gray-600">
                        {status}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="w-[50%] h-screen bg-white flex flex-col items-center">
        <div className="w-[75%] bg-[#DBF3FC] h-[80px] my-14 rounded-full flex items-center">
          <div className="cursor-pointer ml-1">
            <img src={Avatar} width={50} height={50} />
          </div>
          <div className="ml-6 mr-auto">
            <h3 className="text-lg ">Alexandar</h3>
            <p className="text-sm font-light text-gray-600">Online</p>
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
        <div className="h-[75%] w-full overflow-scroll shadow-sm">
          <div className=" p14">
            <div className="max-w-[40%] bg-[#F7E83B] rounded-b-xl rounded-tr-xl p-4 mb-6">
              lorem ipsum dolor
            </div>
            <div className="max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl rounded-tl-xl ml-auto p-4 text-white mb-6">
              lorem ipsum dolor
            </div>
            <div className="max-w-[40%] bg-[#F7E83B] rounded-b-xl rounded-tr-xl p-4 mb-6">
              lorem ipsum dolor
            </div>
            <div className="max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl rounded-tl-xl ml-auto p-4 text-white mb-6">
              lorem ipsum dolor
            </div>
            <div className="max-w-[40%] bg-[#F7E83B] rounded-b-xl rounded-tr-xl p-4 mb-6">
              lorem ipsum dolor
            </div>
            <div className="max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl rounded-tl-xl ml-auto p-4 text-white mb-6">
              lorem ipsum dolor
            </div>
            <div className="max-w-[40%] bg-[#F7E83B] rounded-b-xl rounded-tr-xl p-4 mb-6">
              lorem ipsum dolor
            </div>
            <div className="max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl rounded-tl-xl ml-auto p-4 text-white mb-6">
              lorem ipsum dolor
            </div>
          </div>
        </div>
        <div className="p-14 w-full flex items-center">
          <Input
            placeholder="Type a message..."
            className="w-full"
            inputClassName="p-2 border-0 shadow-md rounded-full bg-light focus:ring-0 focus:border-0 outline-none"
          />
          <div className="ml-4 p-2 cursor-pointer bg-light rounded-full">
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
          <div className="ml-4 p-2 cursor-pointer bg-light rounded-full">
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
      </div>
      <div className="w-[25%] h-screen bg-light"></div>
    </div>
  );
}

export default Dashboard;
