import { setPosts } from "@/redux/post";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const getAllPost = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const fetchAllPost = async () => {
			try {
				const res = await axios.get(
					"http://localhost:5000/app/post/allposts",
					{ withCredentials: true },
				);
                if(res.data.success){
                    console.log(res.data); 
                    dispatch(setPosts(res.data.posts))
                }
			} catch (error) {}
		};
        fetchAllPost();
	}, []);
};

export default getAllPost