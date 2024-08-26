import { useEffect } from "react";
import Home from "./components/Home";
import LogIn from "./components/Login";
import Mainlayout from "./components/Mainlayout";
import Profile from "./components/Profile";
import SignUp from "./components/Signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { setSocket } from "./redux/socket";
import { setOnlineUsers } from "./redux/online";

const browserRoute = createBrowserRouter([
	{
		path: "/",
		element: <Mainlayout />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/profile",
				element: <Profile />,
			},
		],
	},
	{
		path: "/signup",
		element: <SignUp />,
	},
	{
		path: "/login",
		element: <LogIn />,
	},
]);

function App() {
	const { user } = useSelector((store) => store.auth);
  const {socket } = useSelector(store => store.socketio)
	const dispatch = useDispatch();

	useEffect(() => {
		if (user) {
			const socketio = io("http://localhost:5000", {
				query: {
					userId: user?._id,
				},
				transports: ["websocket"],
			});
			dispatch(setSocket(socketio));

			socketio.on("getOnlineUsers", (onlineUsers) => {
				dispatch(setOnlineUsers(onlineUsers));
			});

			return () => {
				socketio.close();
				dispatch(setSocket(null));
			};
		} else if(socket){
			socket.close();
			dispatch(setSocket(null));
		}
	}, [user, dispatch]);
	return (
		<>
			<RouterProvider router={browserRoute} />
		</>
	);
}

export default App;
