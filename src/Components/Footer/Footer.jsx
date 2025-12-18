import React from "react";
import { MdEmail } from "react-icons/md";
import { PiPhoneCall } from "react-icons/pi";
import { FaHeartbeat } from "react-icons/fa";
import { Link } from "react-router";
import logo from "../../assets/blood-logo.png";
import xIcon from "../../assets/x-logo-50.png";
import linkedinIcon from "../../assets/inkedin-48.png";
import facebookIcon from "../../assets/facebook-logo-48.png";
import intagramIcon from "../../assets/nstagram-logo-48.png";

const Footer = () => {
  return (
    <footer className="relative mt-20 overflow-hidden border-t border-slate-100 bg-slate-50">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[60%] bg-red-100/40 rounded-full blur-[120px]"></div>
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[50%] bg-blue-50/50 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto py-20 px-6 md:px-10">
        <div className="flex flex-col lg:flex-row justify-between gap-16">
          {/* Brand & Socials */}
          <div className="max-w-sm space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 group cursor-pointer w-fit">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-400 blur-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  <img
                    src={logo}
                    className="h-14 w-14 object-contain group-hover:scale-110 transition-all duration-500 relative z-10"
                    alt="Logo"
                  />
                </div>
                <h1 className="text-slate-900 text-3xl font-black tracking-tighter">
                  Save<span className="text-red-600">Life</span>
                </h1>
              </div>
              <p className="text-slate-500 font-medium leading-7 italic border-l-4 border-red-500/20 pl-4">
                "Every blood donor is a hero. We simplify the journey from a
                generous heart to a life in need."
              </p>
            </div>

            <div className="flex gap-4">
              {[
                { img: xIcon, label: "X" },
                { img: linkedinIcon, label: "LinkedIn" },
                { img: facebookIcon, label: "Facebook" },
                { img: intagramIcon, label: "Instagram" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-11 h-11 flex items-center justify-center bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-red-200/50 hover:-translate-y-1 hover:border-red-200 transition-all duration-300 group"
                >
                  <img
                    src={social.img}
                    alt={social.label}
                    className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 lg:gap-20">
            <div className="space-y-6">
              <h6 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600/60">
                Platform
              </h6>
              <ul className="space-y-4">
                {["Find Donors", "Blood Bank", "Camp Map", "API Docs"].map(
                  (item) => (
                    <li key={item}>
                      <Link className="text-slate-600 hover:text-slate-900 text-sm font-bold transition-colors flex items-center gap-2 group">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 scale-0 group-hover:scale-100 transition-transform"></span>
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="space-y-6">
              <h6 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600/60">
                Organization
              </h6>
              <ul className="space-y-4">
                {["Our Story", "Leadership", "Transparency", "Partners"].map(
                  (item) => (
                    <li key={item}>
                      <Link className="text-slate-600 hover:text-slate-900 text-sm font-bold transition-colors flex items-center gap-2 group">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 scale-0 group-hover:scale-100 transition-transform"></span>
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="space-y-6 col-span-2 sm:col-span-1">
              <h6 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600/60">
                Contact
              </h6>
              <div className="space-y-4">
                <a
                  href="mailto:help@savelife.org"
                  className="block p-4 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-2xl hover:border-red-200 hover:bg-white transition-all group"
                >
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-1">
                    Email us
                  </p>
                  <p className="text-sm font-bold text-slate-800 group-hover:text-red-600">
                    help@savelife.org
                  </p>
                </a>
                <a
                  href="tel:+8801755664564"
                  className="block p-4 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-2xl hover:border-red-200 hover:bg-white transition-all group"
                >
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-1">
                    Call Support
                  </p>
                  <p className="text-sm font-bold text-slate-800 group-hover:text-red-600">
                    +880 175 5664564
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Glass Bar */}
      <div className="border-t border-slate-200 bg-white/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto py-8 px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[11px] font-bold text-slate-500 tracking-wider">
            © 2025 <span className="text-slate-900">SAVELIFE FOUNDATION</span>.
            ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-6">
            <Link className="text-[10px] font-black text-slate-400 hover:text-red-600 uppercase tracking-widest">
              Terms
            </Link>
            <Link className="text-[10px] font-black text-slate-400 hover:text-red-600 uppercase tracking-widest">
              Privacy
            </Link>
            <div className="h-4 w-[1px] bg-slate-200"></div>
            <div className="flex items-center gap-2 px-4 py-2 bg-red-600 rounded-xl text-white shadow-lg shadow-red-200">
              <FaHeartbeat className="animate-pulse text-sm" />
              <span className="text-[10px] font-black uppercase">
                Live Saves: 1,284
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
