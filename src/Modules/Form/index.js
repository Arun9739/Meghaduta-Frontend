import React, { useState } from "react";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { useNavigate } from "react-router-dom"

const Form = ({ isSignInPage = false }) => {
  const [data, setData] = useState({
    ...(!isSignInPage && {
      fullName: "",
    }),
    email: "",
    password: "",
  });
  const navigate = useNavigate()
  return (
    <div className="bg-light h-screen flex items-center justify-center">
    <div className="bg-white w-[500px] h-[600px] shadow-lg rounded-lg flex flex-col justify-center items-center">
      <div className="text-4xl font-extrabold">
        Welcome {isSignInPage && "Back"}
      </div>
      <div className="text-xl font-light mb-14">
        {isSignInPage ? "Sign in to continue" : "Sign up to get Started"}
      </div>

      <form className="flex flex-col items-center w-full">
        {!isSignInPage && (
          <Input
            label="Full name"
            name="name"
            placeholder="Enter your full name"
            className="mb-6"
            value={data.fullName}
            onChange={(e) => setData({ ...data, fullName: e.target.value })}
          />
        )}
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email address "
          className="mb-6"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <Input
          label="Password"
          name="password"
          placeholder="Enter your password "
          className="mb-12"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <Button
          label={isSignInPage ? "Sign In" : "Sign up"}
          type="submit"
          className="mb-2"
        />
      </form>

      <div>
        {isSignInPage ? "Don't have an account?" : "Already have an account?"}{" "}
        <span className="text-primary cursor-pointer" onClick={() => navigate(`/users/${isSignInPage ? 'sign_up':'sign_in'}`)}>
          {isSignInPage ? "Sign Up" : "Sign In"}
        </span>
      </div>
    </div>
    </div>
  );
};

export default Form;
