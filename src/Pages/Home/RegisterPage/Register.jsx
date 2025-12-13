import toast from 'daisyui/components/toast';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../../Provider/AuthContext';
import { IoEyeOff } from 'react-icons/io5';
import { FaEye } from 'react-icons/fa';

const Register = () => {

     const [nameError, setNameError] = useState("");
     const [passwordError, setPasswordError] = useState("");
     const [show, setShow] = useState(false);

     const navigate = useNavigate();
     const { createUser, setUser, updateUser } =
       useContext(AuthContext);

     const handleRegister = (e) => {
       e.preventDefault();

       const form = e.target;
       const name = form.name.value;

       if (name.length < 5) {
         setNameError("Use more than 5 Characters");
         return;
       } else {
         setNameError("");
       }

       const photo = form.photo.value;
       const email = form.email.value;
       const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

       if (!emailRegEx.test(email)) {
         console.log("Invalid email");
         return;
       }

       const password = form.password.value;
       const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

       if (!regex.test(password)) {
         setPasswordError(
           "Password must have at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
         );
         return;
       } else {
         setPasswordError("");
       }

       createUser(email, password)
         .then((result) => {
           const user = result.user;
           toast.success("Registered Successfully!");

           updateUser({ displayName: name, photoURL: photo })
             .then(() => {
               setUser({ ...user, displayName: name, photoURL: photo });
               navigate("/");
             })
             .catch((error) => console.log(error));
         })
         .catch((error) => toast.error(error.code));
     };

    return (
      <div>
        <title>Register</title>

        <div className="hero py-10 min-h-screen">
          <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
            <h1 className="text-2xl text-center pt-5 font-semibold">
              Register Now
            </h1>

            <div className="card-body">
              <form onSubmit={handleRegister}>
                <fieldset className="fieldset">
                  <label className="label text-lg">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="input"
                    placeholder="Enter Your Full Name"
                    required
                  />
                  {nameError && (
                    <p className="text-xs text-red-500">{nameError}</p>
                  )}

                  <label className="label text-lg">Photo URL</label>
                  <input
                    type="text"
                    name="photo"
                    className="input"
                    placeholder="Photo URL"
                    required
                  />

                  <label className="label text-lg">Email</label>
                  <input
                    type="email"
                    name="email"
                    autoComplete="off"
                    className="input"
                    placeholder="Enter Your Email Address"
                    required
                  />

                  <div className="relative">
                    <label className="label text-lg">Password</label>
                    <input
                      type={show ? "text" : "password"}
                      name="password"
                      autoComplete="new-password"
                      className="input"
                      placeholder="Enter Your Password"
                      required
                    />
                    {passwordError && (
                      <p className="text-xs text-red-500">{passwordError}</p>
                    )}
                    <span
                      onClick={() => setShow(!show)}
                      className="absolute right-[25px] top-[42px] cursor-pointer z-50"
                    >
                      {show ? <FaEye size={15} /> : <IoEyeOff size={15} />}
                    </span>
                  </div>
                  <button
                    className="btn bg-green-700 text-white mt-4"
                    type="submit"
                  >
                    Register
                  </button>
                </fieldset>
              </form>

              <p className="text-center">
                Already have an account?{" "}
                <Link className="text-green-500" to="/auth/login">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Register;