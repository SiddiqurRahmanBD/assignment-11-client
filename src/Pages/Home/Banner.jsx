import React from "react";
import { useNavigate } from "react-router";
import blood_donation from '../../assets/Blood-Donation.jpg';

const Banner = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-[650px] bg-white overflow-hidden flex items-center">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-red-50 clip-path-slant hidden lg:block"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-100/50 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* LEFT CONTENT */}
        <div className="space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 text-red-600 shadow-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
            </span>
            <span className="text-sm font-bold tracking-wide uppercase">
              24/7 Emergency Support
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1]">
            Every Drop <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">
              Saves a Life.
            </span>
          </h1>

          <p className="text-slate-500 text-lg md:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Join the world's largest blood donation network. Your contribution
            can bridge the gap between life and hope.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={() => navigate("/auth/register")}
              className="btn btn-lg bg-red-600 hover:bg-red-700 border-none text-white px-8 rounded-2xl shadow-xl shadow-red-200 transition-all hover:-translate-y-1"
            >
              Join Now
            </button>
            <button
              onClick={() => navigate("/search-page")}
              className="btn btn-lg btn-outline border-slate-200 hover:bg-slate-900 hover:border-slate-900 px-8 rounded-2xl transition-all"
            >
              Search a Donor
            </button>
          </div>

          {/* User Trust Avatars */}
          {/* <div className="flex items-center justify-center lg:justify-start gap-4 pt-4">
            <div className="avatar-group -space-x-4 rtl:space-x-reverse">
              <div className="avatar border-white w-10">
                <img src="https://i.pravatar.cc/100?u=1" />
              </div>
              <div className="avatar border-white w-10">
                <img src="https://i.pravatar.cc/100?u=2" />
              </div>
              <div className="avatar border-white w-10">
                <img src="https://i.pravatar.cc/100?u=3" />
              </div>
              <div className="avatar placeholder border-white w-10 bg-slate-800 text-neutral-content">
                <span className="text-xs">+99</span>
              </div>
            </div>
            <p className="text-sm text-slate-500 font-medium">
              Joined by 10,000+ Donors
            </p>
          </div> */}
        </div>

        {/* RIGHT VISUAL CONTENT */}
        <div className="relative">
          {/* Main Image with decorative border */}
          <div className="relative z-10 rounded-[3rem] overflow-hidden border-[12px] border-white shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
            <img
              src={blood_donation}
              alt="Blood Donation"
              className="w-full h-[500px] object-cover"
            />
          </div>

          {/* Floating Stats Card 1 */}
          <div className="absolute -top-6 -right-6 z-20 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/20 animate-bounce-slow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-2xl text-red-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              {/* <div>
                <p className="text-2xl font-black text-slate-800">4,800+</p>
                <p className="text-xs font-bold text-slate-500 uppercase">
                  Requests Filled
                </p>
              </div> */}
            </div>
          </div>

          {/* Floating Stats Card 2 */}
          {/* <div className="absolute -bottom-6 -left-6 z-20 bg-slate-900 p-6 rounded-3xl shadow-xl animate-float">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border-2 border-red-500 flex items-center justify-center text-red-500">
                <span className="font-bold">O+</span>
              </div>
              <div className="text-white">
                <p className="text-sm font-bold">Most Requested</p>
                <p className="text-xs opacity-70">Blood Group This Week</p>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* Tailwind Custom CSS for Animations */}
      {/* <style>{`
        .clip-path-slant {
          clip-path: polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%);
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
      `}</style> */}
    </section>
  );
};

export default Banner;
