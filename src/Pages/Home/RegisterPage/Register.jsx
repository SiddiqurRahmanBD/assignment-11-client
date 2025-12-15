
import React, { useContext, useEffect, useState } from "react";
import {Link, useNavigate } from "react-router";
import { AuthContext } from "../../../Provider/AuthContext";
import { IoEyeOff } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const { createUser, setUser, updateUser } = useContext(AuthContext);

  const [districts, setDistricts] = useState([])
  const [upzilas, setUpzilas] = useState([])

  const [district, setDistrict] = useState('')
  const [upzila, setUpzila] = useState('')
 
  
useEffect(() => {
  axios
    .get("/district.json")
    .then((res) => {
      setDistricts(res.data);
    })
    .catch((err) => console.log("District error:", err));

  axios
    .get("/upzila.json")
    .then((res) => {
      setUpzilas(res.data);
    })
    .catch((err) => console.log("Upzila error:", err));
}, []);


  const handleRegister = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const photo = form.photo;
    const file = photo.files[0];
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const bloodGroup = form.bloodGroup.value;

    if (name.length < 5) {
      setNameError("Use more than 5 Characters");
      return;
    } else {
      setNameError("");
    }

    const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegEx.test(email)) {
      console.log("Invalid email");
      return;
    }

    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!regex.test(password)) {
      setPasswordError(
        "Password must have at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
      );
      return;
    } else {
      setPasswordError("");
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    } else {
      setConfirmPasswordError("");
    }



    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=80872c72797ec82a69fc4e1b1174a045`,
      { image: file },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const photoURL = res.data.data.display_url;

    const formdata = {
      name,
      email,
      bloodGroup,
      photoURL,
      district,
      upzila
    };
    console.log(formdata);

    createUser(email, password)
      .then(() => {
        // const user = result.user;
        toast.success("Registered Successfully!");

        updateUser({ displayName:name, photoURL: photoURL })
          .then(() => {
            axios.post("http://localhost:3000/users", formdata);
            // setUser({ ...user, displayName: name, photoURL: photo });
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
                  type="file"
                  name="photo"
                  className="input"
                  placeholder="Photo URL"
                  required
                />

                <label className="label text-lg">Blood Group</label>

                <select
                  name="bloodGroup"
                  className="select select-bordered "
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select your blood group
                  </option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>

                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="select select-bordered "
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select your District
                  </option>
                  {districts.map((d) => (
                    <option value={d?.name} key={d?.id}>
                      {d?.name}
                    </option>
                  ))}
                </select>
                <select
                  value={upzila}
                  onChange={(e) => setUpzila(e.target.value)}
                  className="select select-bordered "
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select your Upzila
                  </option>
                  {upzilas.map((u) => (
                    <option value={u?.name} key={u?.id}>
                      {u?.name}
                    </option>
                  ))}
                </select>

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

                <div className="relative">
                  <label className="label text-lg">Confirm Password</label>
                  <input
                    type={show ? "text" : "password"}
                    name="confirmPassword"
                    autoComplete="new-password"
                    className="input"
                    placeholder="Confirm Your Password"
                    required
                  />

                  {confirmPasswordError && (
                    <p className="text-xs text-red-500">
                      {confirmPasswordError}
                    </p>
                  )}
                </div>

                <button
                  className="btn btn-primary text-white hover:bg-orange-400 hover:text-black mt-4"
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
