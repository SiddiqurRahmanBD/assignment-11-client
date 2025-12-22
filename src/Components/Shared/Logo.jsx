import React from 'react';
import logo from "../../assets/blood-logo.png";

const Logo = () => {
    return (
      <div className="flex items-center gap-1 group">
        <div className="relative">
          <img
            src={logo}
            className="h-12 w-12 md:h-14 md:w-14 object-contain group-hover:scale-110 transition-transform duration-300"
            alt="SaveLife Logo"
          />
          <div className="absolute inset-0 bg-red-500/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-slate-800">
          Save<span className="text-red-600">Life</span>
        </h1>
      </div>
    );
};

export default Logo;