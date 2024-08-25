import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "@/redux/post";

const CreatePost = ({ open, setOpen }) => {
	const [caption, setCaption] = useState("");
    const {user} = useSelector(store => store.auth)
    const {posts} = useSelector(store => store.post)
    const dispatch = useDispatch();

	const createPostHandler = async (e) => {
		e.preventDefault(); // Prevent the default form submission

		try {
			const res = await axios.post(
				"http://localhost:5000/app/post/create",
				{ caption },
				{
					headers: {
						"Content-Type": "application/json"
					},
					withCredentials: true,
				},
			);
			if (res.data.success) {
                console.log("Post added");
				setCaption(""); 
				setOpen(false); 
                dispatch(setPosts([, res.data.post,...posts]))
			}
		} catch (error) {
			console.log("Error creating post:", error);
		}
	};

	return (
		<Dialog open={open}>
			<DialogContent onInteractOutside={() => setOpen(false)}>
				<DialogHeader>Create New Post</DialogHeader>
				<div className="flex gap-3 items-center">
					<Avatar>
						<AvatarImage src="" alt="img" />
						<AvatarFallback>DP</AvatarFallback>
					</Avatar>
				</div>
				<div>
					<h1 className="font-semibold text-xs">{user?.username}</h1>
					<span className="text-gray-600 text-xs">Bio here...</span>
				</div>
				
				<form onSubmit={createPostHandler}>
					<Textarea
						value={caption}
						onChange={(e) => setCaption(e.target.value)}
						placeholder="Type your caption here"
						required
					/>
					<Button
						type="submit"
						className="w-full mt-2"
					>
						Post
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default CreatePost;
