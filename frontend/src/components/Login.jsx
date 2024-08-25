import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/redux/auth";


const LogIn = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const EventHandler = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const logInHandler = async (event) => {
    event.preventDefault();
    console.log(input);

    try {
      setLoading(true);
      const login = await axios.post(
        "http://localhost:5000/app/user/login",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (login.data.success) {
        dispatch(setAuthUser(login.data.user))
        navigate("/");
        console.log("Login success");
        setInput({
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center w-screen h-screen justify-center">
      <form
        onSubmit={logInHandler}
        className="shadow-lg flex flex-col gap-5 p-8"
      >
        <div>
          <span font-medium="true" my-2="true">
            Email
          </span>
          <Input
            type="email"
            name="email"
            className="focus"
            onChange={EventHandler}
            value={input.email}
          />
        </div>
        <div>
          <span font-medium="true" my-2="true">
            Password
          </span>
          <Input
            type="password"
            name="password"
            className="focus"
            onChange={EventHandler}
            value={input.password}
          />
        </div>
        <Button type="Submit">LogIn</Button>
        <span className="text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600">
            Signup
          </Link>
        </span>
      </form>
    </div>
  );
};

export default LogIn;
