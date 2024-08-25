import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import CommentView from "./CommentView";

const Post = () => {
	const [comments, setComments] = useState(false);
	return (
		<div className="my-8 w-full max-w-sm mx-auto">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Avatar>
						<AvatarImage src="" alt="@shadcn" />
						<AvatarFallback>DP</AvatarFallback>
					</Avatar>
					<h1>Username</h1>
				</div>
				<Button variant="destructive" className="cursor-pointer">
					Delete
				</Button>
			</div>
			<img
				className="rounded-sm my-2 w-full"
				src="https://plus.unsplash.com/premium_photo-1673138824704-344104aec465?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bmF0dXJlJTIwaW1hZ2VzfGVufDB8fDB8fHww"
				alt="post_img"
			/>

			<div className="flex items-center justify-between">
				<div className="flex items-center justify-between gap-4">
					<FaRegHeart size={"25px"} className="cursor-pointer" />
					<MessageCircle onClick={()=>setComments(true)} size={"25px"} className="cursor-pointer" />
					<Send size={"25px"} className="cursor-pointer" />
				</div>
			</div>
			<span className="font-medium block ">2 likes</span>
			<p>
				<span className="font-medium mr-2">Username</span>
				caption
			</p>
			<span className='cursor-pointer hover: underline' onClick={()=>setComments(true)}>View all comments</span>
			<CommentView comments={comments} setComments={setComments}/>
			<div className="flex items-center justify-between">
				<input type="text" placeholder="Add Comment..." />
				<span>Post</span>
			</div>
		</div>
	);
};

export default Post;
