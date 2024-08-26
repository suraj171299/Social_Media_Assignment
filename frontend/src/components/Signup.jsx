import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SignUp = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const EventHandler = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };
  const { user } = useSelector(store => store.auth)
  const signUpHandler = async (event) => {
    event.preventDefault();
    console.log(input);

    try {
      setLoading(true);
      const signup = await axios.post(
        "http://localhost:5000/app/user/signup",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (signup.data.success) {
        navigate("/login")
        console.log("Signup success");
        setInput({
          username: "",
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

  useEffect(()=>{
    if(user){
      navigate('/')
    }
  },[])
  return (
    <div className="flex items-center w-screen h-screen justify-center">
      <form
        onSubmit={signUpHandler}
        className="shadow-lg flex flex-col gap-5 p-8"
      >
        <div>
          <span font-medium="true" my-2="true">
            Username
          </span>
          <Input
            type="text"
            name="username"
            className="focus"
            onChange={EventHandler}
            value={input.username}
          />
        </div>
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
        <Button type="Submit">SignUp</Button>
        <span className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default SignUp;
