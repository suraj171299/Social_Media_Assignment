import React from "react";
import { Flame, Heart, Home, LogOut, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const sideBar = [
  { icon: <Home />, text: "Home" },
  { icon: <PlusCircle />, text: "Create" },
  { icon: <Flame />, text: "Profile" },
  { icon: <Heart />, text: "Notifications" },
  { icon: <LogOut />, text: "Logout" },
];
const Sidebar = () => {

    const navigate = useNavigate();

    const logOutHandler = async() => {
        try {
            const logout = await axios.get('http://localhost:5000/app/user/logout', {withCredentials: true});
            if(logout.data.success){
                navigate('/login');
                // console.log(logout.data.message);   
            }
        } catch (error) {
            console.log(error);
        }
    }
    const sideBarHandler = (inputText) => {
        if(inputText === "Logout") {
            logOutHandler()
        };
    }
  return (
    <div className="fixed top-0 z-10 left-0 px-2 border-r border-gray-300 w-[25%] h-screen">
      <div className="flex flex-col">
        <div>
          {
            sideBar.map((items, index) => {
                return (
                <div onClick={() => sideBarHandler(items.text)} key={index} className='flex items-center gap-3 relative cursor-pointer rounded-lg p-3 my-3'>
                    {items.icon}
                    <span>{items.text}</span>
                </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
