import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";

const SignUp = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  
  const EventHandler = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const signUpHandler = async (event) => {
    event.preventDefault();
    console.log(input);
    
    try {
        const signup = await axios.post('http://localhost:5000/app/user/signup', input,{
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials: true
        });
        if(signup.data.success){
            console.log("Signup success");
        }
    } catch (error) {
        console.log(error);
    }
  }
  return (
    <div className="flex items-center w-screen h-screen justify-center">
      <form
        onSubmit={signUpHandler}
        className="shadow-lg flex flex-col gap-5 p-8"
      >
        <div>
          <span font-medium my-2>
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
          <span font-medium my-2>
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
          <span font-medium my-2>
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
      </form>
    </div>
  );
};

export default SignUp;
