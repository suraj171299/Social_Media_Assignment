import React, { useState } from "react";
import { Flame, Heart, Home, LogOut, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { setAuthUser } from "@/redux/auth";
import CreatePost from "./CreatePost";
import { setPosts, setSelectedPost } from "@/redux/post";


const Sidebar = () => {
	const { user } = useSelector(store => store.auth )
	const navigate = useNavigate();
    const dispatch = useDispatch();
	const [open, setOpen] = useState(false)

	const logOutHandler = async () => {
		try {
			const logout = await axios.get(
				"http://localhost:5000/app/user/logout",
				{ withCredentials: true },
			);
			if (logout.data.success) {
                dispatch(setAuthUser(null))
				dispatch(setSelectedPost(null))
				dispatch(setPosts([]))
				navigate("/login");
				// console.log(logout.data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};
	
	const sideBarHandler = (inputText) => {
		if (inputText === "Logout") {
			logOutHandler();
		}else if(inputText === "Create"){
			setOpen(true);
		}
	};
	const sideBar = [
		{ icon: <Home />, text: "Home" },
		{ icon: <PlusCircle />, text: "Create" },
		{ icon: <Heart />, text: "Notifications" },
		{
			icon: (
				<Avatar className="w-6 h-6">
					<AvatarImage src={user?.profilePicture} alt="@shadcn" />
					<AvatarFallback>DP</AvatarFallback>
				</Avatar>
			),
			text: "Profile",
		},
		{ icon: <LogOut />, text: "Logout" },
	];
	return (
		<div className="fixed top-0 z-10 left-0 px-2 border-r border-gray-300 w-[25%] h-screen">
			<div className="flex flex-col">
				<div>
					{sideBar.map((items, index) => {
						return (
							<div
								onClick={() => sideBarHandler(items.text)}
								key={index}
								className="flex items-center gap-3 relative cursor-pointer rounded-lg p-3 my-3"
							>
								{items.icon}
								<span>{items.text}</span>
							</div>
						);
					})}
				</div>
			</div>
			<CreatePost open={open} setOpen={setOpen}/>
		</div>
	);
};

export default Sidebar;
