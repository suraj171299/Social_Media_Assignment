import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import CommentView from "./CommentView";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setPosts } from "@/redux/post";

const Post = ({ post }) => {
	const [comments, setComments] = useState(false);
	const { user } = useSelector((store) => store.auth);
	const { posts } = useSelector((store) => store.post);
	const [liked, setLiked] = useState(post.likes.includes(user?._id) || false);
	const [postLike, setPostLike] = useState(post.likes.length);
	const dispatch = useDispatch();

	const deletHandler = async () => {
		try {
			const res = await axios.delete(
				`http://localhost:5000/app/post/delete/${post?._id}`,
				{ withCredentials: true },
			);
			if (res.data.success) {
				const updatedPosts = posts.filter(
					(postDeleted) => postDeleted?._id != post?._id,
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
				`http://localhost:5000/app/post/${post._id}/${action}`,
				{ withCredentials: true },
			);
			console.log(res.data);
			if (res.data.success) {
				const updatedLikes = liked ? postLike - 1 : postLike + 1;
				setPostLike(updatedLikes);
				setLiked(!liked);

				// apne post ko update krunga
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
						onClick={() => setComments(true)}
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
				onClick={() => setComments(true)}
			>
				View all comments
			</span>
			<CommentView comments={comments} setComments={setComments} />
			<div className="flex items-center justify-between">
				<input type="text" placeholder="Add Comment..." />
				<span>Post</span>
			</div>
		</div>
	);
};

export default Post;
