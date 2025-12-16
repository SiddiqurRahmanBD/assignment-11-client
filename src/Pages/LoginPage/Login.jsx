import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../Provider/AuthContext";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { toast } from "react-toastify";

const Login = () => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const { signIn, setUser, forgetPass } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const emailRef = useRef(null);

  // Login Handling
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        toast.success("You Logged in in Successfully");
        setUser(user);
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        const errorCode = error.code;
        setError(errorCode);
        console.log(error);
        toast.error("Login Failed! Check your Email or Password.");
      });
  };

  // Forget Password Handling
  const handleForgetPass = () => {
    const email = emailRef.current.value;
    forgetPass(email)
      .then((result) => {
        const user = result.user;
        setUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        alert("Please Check out the Email");
        setError(errorCode);
      });
  };

  return (
    <div>
      <title>Login</title>
      <div className="hero min-h-screen my-10">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h1 className="text-2xl text-center pt-5 font-semibold">Login now</h1>
          <div className="card-body">
            <form onSubmit={handleLogin}>
              <fieldset className="fieldset">
                <label className="label text-lg text-black">Email</label>
                <input
                  type="email"
                  name="email"
                  autoComplete="off"
                  ref={emailRef}
                  className="input"
                  placeholder="Email"
                  required
                />
                <div className="relative">
                  <label className="label text-lg text-black">Password</label>
                  <input
                    type={show ? "text" : "password"}
                    name="password"
                    className="input"
                    autoComplete="new-password"
                    placeholder="Password"
                    required
                  />
                  <span
                    onClick={() => setShow(!show)}
                    className="absolute right-[25px] top-[42px] cursor-pointer z-50"
                  >
                    {show ? <FaEye size={15} /> : <IoEyeOff size={15} />}
                  </span>
                </div>
                <div>
                  <button
                    onClick={handleForgetPass}
                    type="button"
                    className="link link-hover"
                  >
                    Forgot password?
                  </button>
                </div>
                {error && <p className="text-red-700 text-xs">{error}</p>}
                <button
                  type="submit"
                  className="btn btn-primary text-white hover:bg-orange-400 hover:text-black mt-4"
                >
                  Login
                </button>
              </fieldset>
            </form>
            <p className="text-center">
              New to our website ? Please{" "}
              <Link
                className="text-green-500 hover:text-blue-500"
                to="/auth/register"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
