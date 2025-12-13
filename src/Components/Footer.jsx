import React from "react";
import { MdEmail } from "react-icons/md";
import { PiPhoneCall } from "react-icons/pi";
import logo from "../assets/blood-logo.png";
import xIcon from "../assets/x-logo-50.png";
import linkedinIcon from "../assets/inkedin-48.png";
import facebookIcon from "../assets/facebook-logo-48.png";
import intagramIcon from "../assets/nstagram-logo-48.png";

const Footer = () => {
  return (
    <div className="bg-base-300">
      <footer className="footer sm:footer-horizontal text-base-content p-10">
        <nav>
          <div className="flex items-center">
            <img src={logo} className="h-20 w-20" alt="" />
            <h1 className=" text-[#9f0707dc] text-2xl font-bold font-serif">
              Save<span className="text-orange-400">Life</span>
            </h1>
          </div>
          <p>
            “Connecting communities through shared food. <br /> Together, we
            reduce waste and help others eat better.”
          </p>
        </nav>
        <nav>
          <h6 className="footer-title">Support</h6>
          <a className="hover:text-green-700">Help Center</a>
          <a className="hover:text-green-700">FAQs</a>
          <a className="hover:text-green-700">Feedback</a>
          <a className="hover:text-green-700">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Quick Links</h6>
          <a className="hover:text-green-700">Home</a>
          <a className="hover:text-green-700">Available Foods</a>
          <a className="hover:text-green-700">About us</a>
          <a className="hover:text-green-700">Contact</a>
        </nav>
        <nav>
          <h6 className="footer-title">Get in Touch</h6>
          <p className="flex items-center gap-2">
            <MdEmail size={20} color="red" />
            support@foodshare.com
          </p>
          <p className="flex items-center gap-2">
            <PiPhoneCall size={20} color="red" />
            +880 175 5664564
          </p>
          <div className="grid grid-flow-col gap-4">
            <a>
              <img src={xIcon} alt="X Icon" className="w-7 h-7" />
            </a>
            <a>
              <img src={linkedinIcon} alt="X Icon" className="w-7 h-7" />
            </a>
            <a>
              <img src={facebookIcon} alt="X Icon" className="w-7 h-7" />
            </a>
            <a>
              <img src={intagramIcon} alt="X Icon" className="w-7 h-7" />
            </a>
          </div>
        </nav>
      </footer>
      <div className="text-center">
        <p className="pb-10 border-t-2 inline-block">
          © 2025 <span className="text-[#9f0707dc]">Save</span>
          <span className="text-orange-400">Life</span>— Sharing Food, Spreading
          Kindness. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
