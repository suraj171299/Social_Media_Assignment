import React, { useState } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const CommentView = ({ open, setOpen }) => {
	const [text, setText] = useState("");

	const eventHandler = (event) => {
		const input = event.target.value;
		if (input.trim()) {
			setText(input);
		} else {
			setText("");
		}
	};

	const postCommentHandler = async () => {
		alert(text);
	};

	return (
		<Dialog open={open}>
			<DialogContent
				onInteractOutside={() => setOpen(false)}
				className="max-w-5xl p-0 flex flex-col"
			>
				<div className="flex flex-1">
					<div>
						<img
							src="https://plus.unsplash.com/premium_photo-1673138824704-344104aec465?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bmF0dXJlJTIwaW1hZ2VzfGVufDB8fDB8fHww"
							alt="post_img"
						/>
					</div>
					<div className="flex flex-col justify-between">
						<div className="flex items-center justify-between p-4">
							<div className="flex gap-3 items-center">
								<Avatar>
									<AvatarImage src="" alt="@shadcn" />
									<AvatarFallback>DP</AvatarFallback>
								</Avatar>
								<Link className="font-bold text-xs">
									Username
								</Link>
							</div>
						</div>
						<hr />
						<div className="flex-1 overflow-y-auto max-h-96 p-4">
							comments
						</div>
						<div className="p-4">
							<div className="flex item-center gap-2">
								<input
									onChange={eventHandler}
									value={text}
									type="text"
									placeholder="Add Comment"
									className="w-full outline-none border text-sm border-gray-300 p-2 rounded"
								/>
								<Button
									onClick={postCommentHandler}
									variant="outline"
								>
									Add
								</Button>
							</div>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default CommentView;
