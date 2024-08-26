import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import CommentView from "./CommentView";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setPosts, setSelectedPost } from "@/redux/post";

const Post = ({ post }) => {
	const [open, setOpen] = useState(false);
	const { user } = useSelector((store) => store.auth);
	const { posts } = useSelector((store) => store.post);
	const [liked, setLiked] = useState(post.likes.includes(user?._id) || false);
	const [postLike, setPostLike] = useState(post.likes.length);
	const [text, setText] = useState("");
	const [comment, setComment] = useState(post.comments);
	const dispatch = useDispatch();

	const EventHandler = (e) => {
		const inputText = e.target.value;
		// console.log(inputText);
		if (inputText.trim()) {
			setText(inputText);
		} else {
			setText("");
		}
	};

	const commentHandler = async () => {
		try {
			const res = await axios.post(
				`http://localhost:5000/app/post/${post._id}/comment`,
				{ text },
				{
					headers: {
						"Content-Type": "application/json",
					},
					withCredentials: true,
				},
			);
			console.log(res.data);
			if (res.data.success) {
				const updatedCommentData = [...comment, res.data.comment];
				setComment(updatedCommentData);

				const updatedPostData = posts.map((p) =>
					p._id === post._id
						? { ...p, comments: updatedCommentData }
						: p,
				);

				dispatch(setPosts(updatedPostData));
				console.log(res.data.message);
				setText("");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const deletHandler = async () => {
		try {
			const res = await axios.delete(
				`http://localhost:5000/app/post/delete/${post?._id}`,
				{ withCredentials: true },
			);
			if (res.data.success) {
				const updatedPosts = posts.filter(
					(postDeleted) => postDeleted?._id !== post?._id,
				);
				dispatch(setPosts(updatedPosts));
				console.log("Post deleted");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const likeHandler = async () => {
		try {
			const action = liked ? "dislike" : "like";
			const res = await axios.get(
				`http://localhost:5000/app/post/${post?._id}/${action}`,
				{ withCredentials: true },
			);
			console.log(res.data);
			if (res.data.success) {
				const updatedLikes = liked ? postLike - 1 : postLike + 1;
				setPostLike(updatedLikes);
				setLiked(!liked);

				const updatedPostData = posts.map((p) =>
					p._id === post._id
						? {
								...p,
								likes: liked
									? p.likes.filter((id) => id !== user._id)
									: [...p.likes, user._id],
						  }
						: p,
				);
				dispatch(setPosts(updatedPostData));
				console.log(res.data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="my-8 w-full max-w-sm mx-auto">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Avatar>
						<AvatarImage src="" alt="@shadcn" />
						<AvatarFallback>DP</AvatarFallback>
					</Avatar>
					<h1>{post.author?.username}</h1>
				</div>
				{user && user?._id === post?.author._id && (
					<Button
						onClick={deletHandler}
						variant="destructive"
						className="cursor-pointer"
					>
						Delete
					</Button>
				)}
			</div>
			<img
				className="rounded-sm my-2 w-full"
				src="https://plus.unsplash.com/premium_photo-1673138824704-344104aec465?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bmF0dXJlJTIwaW1hZ2VzfGVufDB8fDB8fHww"
				alt="post_img"
			/>

			<div className="flex items-center justify-between">
				<div className="flex items-center justify-between gap-4">
					{liked ? (
						<FaHeart
							onClick={likeHandler}
							size={"24"}
							className="cursor-pointer text-red-600"
						/>
					) : (
						<FaRegHeart
							onClick={likeHandler}
							size={"25px"}
							className="cursor-pointer"
						/>
					)}
					<MessageCircle
						onClick={() => {
							dispatch(setSelectedPost(post));
							setOpen(true);
						}}
						size={"25px"}
						className="cursor-pointer"
					/>
					<Send size={"25px"} className="cursor-pointer" />
				</div>
			</div>
			<span className="font-medium block ">{postLike} likes</span>
			<p>
				<span className="font-medium mr-2">
					{post.author?.username}
				</span>
				{post.caption}
			</p>
			<span
				className="cursor-pointer hover: underline"
				onClick={() => {
					dispatch(setSelectedPost(post));
					setOpen(true);
				}}
			>
				View all {comment.length} comments
			</span>
			<CommentView open={open} setOpen={setOpen} />
			<div className="flex items-center justify-between">
				<input
					value={text}
					onChange={EventHandler}
					type="text"
					placeholder="Add Comment..."
					className="outline-none text-sm w-full"
				/>
				<span
					onClick={commentHandler}
					className="cursor-pointer hover: underline"
				>
					Post
				</span>
			</div>
		</div>
	);
};

export default Post;
