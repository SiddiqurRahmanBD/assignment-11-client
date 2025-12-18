import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../Provider/AuthContext";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { Mail, Lock, ArrowRight, Heart, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";

const Login = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, setUser, forgetPass } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const emailRef = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        toast.success("Welcome back, Hero!");
        setUser(result.user);
        navigate(location.state || "/");
      })
      .catch((error) => {
        toast.error("Invalid credentials. Please try again.");
        console.error(error);
      })
      .finally(() => setLoading(false));
  };

  const handleForgetPass = () => {
    const email = emailRef.current.value;
    if (!email) {
      return toast.warning("Please enter your email first!");
    }
    forgetPass(email)
      .then(() => toast.info("Password reset email sent!"))
      .catch(() => toast.error("Failed to send reset email."));
  };

  return (
    <div className="min-h-screen bg-[#FDFEFF] flex items-center justify-center py-16 px-4 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-red-50/40 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-blue-50/40 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-[2rem] shadow-xl shadow-slate-100 mb-6 border border-slate-50">
            <Heart className="text-red-600 w-10 h-10 fill-red-600 animate-pulse" />
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-slate-500 mt-3 text-lg font-medium">
            Log in to your account
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-slate-200/40">
          {/* autoComplete="off" on form to prevent global autofill */}
          <form onSubmit={handleLogin} className="space-y-6" autoComplete="off">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  ref={emailRef}
                  /* Using "none" or "off" to block browser defaults */
                  autoComplete="off"
                  className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center mb-1 px-1">
                <label className="text-sm font-bold text-slate-700">
                  Password
                </label>
                <button
                  onClick={handleForgetPass}
                  type="button"
                  className="text-xs font-bold text-red-600 hover:text-red-700 transition-colors"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors w-5 h-5" />
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  /* "new-password" is the strongest way to stop chrome from auto-filling saved passwords */
                  autoComplete="new-password"
                  className="w-full h-14 pl-12 pr-12 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
                  placeholder="••••••••"
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

            <button
              disabled={loading}
              type="submit"
              className="w-full h-14 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold text-lg shadow-lg shadow-red-100 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group disabled:opacity-70"
            >
              {loading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-slate-50 text-center">
            <p className="text-slate-500 font-medium">
              New user?{" "}
              <Link
                to="/auth/register"
                className="text-red-600 font-bold hover:text-red-700 underline underline-offset-4"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
