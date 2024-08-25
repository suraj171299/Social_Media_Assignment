import Home from "./components/Home";
import LogIn from "./components/Login";
import Mainlayout from "./components/Mainlayout";
import SignUp from "./components/Signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const browserRoute = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout />,
    children: [
      {
        path: "/",
        element: <Home />,
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
  return (
    <>
      <RouterProvider router={browserRoute} />
    </>
  );
}

export default App;
