import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthContext";
import { IoEyeOff, IoCloudUploadOutline } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { User, Mail, Lock, MapPin, Droplet, CheckCircle2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import useAxios from "../../Hooks/useAxios";

const Register = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [upzilas, setUpzilas] = useState([]);
  const [district, setDistrict] = useState("");
  const [upzila, setUpzila] = useState("");

  const navigate = useNavigate();
  const { createUser, updateUser } = useContext(AuthContext);
  const axiosInstance = useAxios();

  useEffect(() => {
    axios.get("/district.json").then((res) => setDistricts(res.data));
    axios.get("/upzila.json").then((res) => setUpzilas(res.data));
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const file = form.photo.files[0];
    const email = form.email.value;
    const password = form.password.value;
    const bloodGroup = form.bloodGroup.value;

    try {
      const imgData = new FormData();
      imgData.append("image", file);
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=80872c72797ec82a69fc4e1b1174a045`,
        imgData
      );
      const photoURL = res.data.data.display_url;

      const formdata = {
        name,
        email,
        bloodGroup,
        photoURL,
        district,
        upzila,
        role: "donor",
        status: "active",
      };

      await createUser(email, password);
      await updateUser({ displayName: name, photoURL: photoURL });
      await axiosInstance.post("/users", formdata);

      toast.success("Welcome to SaveLife!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFEFF] flex items-center justify-center py-16 px-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900">
            Join SaveLife
          </h1>
          <p className="text-slate-500 mt-2">
            Create a fresh account to start saving lives.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl border border-slate-100 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50">
          {/* Added autoComplete="off" to form to prevent global pre-fill */}
          <form
            onSubmit={handleRegister}
            className="space-y-6"
            autoComplete="off"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Full Name
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
                    placeholder="Enter your name"
                    required
                  />
                </div>
              </div>

              {/* Email - Using autoComplete="none" to prevent browser suggestion */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    autoComplete="none"
                    className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
                    placeholder="email@example.com"
                    required
                  />
                </div>
              </div>

              {/* Blood Group */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Blood Group
                </label>
                <div className="relative">
                  <Droplet className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 w-5 h-5 z-10" />
                  <select
                    name="bloodGroup"
                    className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all appearance-none cursor-pointer"
                    required
                  >
                    <option value="" disabled selected>
                      Select Blood Group
                    </option>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                      (g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              {/* District */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  District
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 z-10" />
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all appearance-none cursor-pointer"
                    required
                  >
                    <option value="" disabled>
                      Choose District
                    </option>
                    {districts.map((d) => (
                      <option value={d?.name} key={d?.id}>
                        {d?.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Upazila */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Upazila
                </label>
                <select
                  value={upzila}
                  onChange={(e) => setUpzila(e.target.value)}
                  className="w-full h-14 px-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all cursor-pointer"
                  required
                >
                  <option value="" disabled>
                    Choose Upazila
                  </option>
                  {upzilas.map((u) => (
                    <option value={u?.name} key={u?.id}>
                      {u?.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Photo */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Profile Photo
                </label>
                <label className="flex items-center gap-3 w-full h-14 px-4 bg-slate-50 border-2 border-slate-100 border-dashed rounded-2xl cursor-pointer hover:bg-red-50 transition-all">
                  <IoCloudUploadOutline className="w-6 h-6 text-slate-400" />
                  <span className="text-slate-500 text-sm font-medium">
                    Upload Image
                  </span>
                  <input type="file" name="photo" className="hidden" required />
                </label>
              </div>

              {/* Password - Using autoComplete="new-password" */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type={show ? "text" : "password"}
                    name="password"
                    autoComplete="new-password"
                    placeholder="Create Password"
                    className="w-full h-14 pl-12 pr-12 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {show ? <FaEye size={18} /> : <IoEyeOff size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Confirm Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type={show ? "text" : "password"}
                    name="confirmPassword"
                    autoComplete="new-password"
                    placeholder="Repeat Password"
                    className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full h-14 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold text-lg shadow-lg shadow-red-100 transition-all active:scale-[0.99] flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" /> Create New Account
                </>
              )}
            </button>
          </form>

          <p className="text-center mt-8 text-slate-500 font-medium">
            Joined before?{" "}
            <Link
              className="text-red-600 font-bold hover:underline"
              to="/auth/login"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
