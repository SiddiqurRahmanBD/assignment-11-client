import React from "react";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="px-4 py-1.5 rounded-full bg-red-100 text-red-600 font-semibold text-sm uppercase tracking-wider">
            Get in Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 mt-4 mb-4">
            Let’s Save <span className="text-red-600">Lives</span> Together
          </h2>
          <p className="max-w-2xl mx-auto text-slate-500 text-lg">
            Have questions about donation? Need blood urgently? Our team is
            available 24/7 to support the community.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Side: Contact Cards (4 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Emergency Call Card */}
            <div className="group p-8 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-red-200 transition-all duration-300">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-200 group-hover:scale-110 transition-transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-red-600 uppercase tracking-tight">
                    Emergency Hotline
                  </p>
                  <a
                    href="tel:+880123456789"
                    className="text-2xl font-bold text-slate-800 hover:text-red-600 transition-colors"
                  >
                    +880 1234-56789
                  </a>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="group p-8 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-red-200 transition-all duration-300">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-white shadow-lg shadow-slate-200 group-hover:scale-110 transition-transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-tight">
                    Support Email
                  </p>
                  <p className="text-xl font-bold text-slate-800">
                    help@bloodhero.org
                  </p>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="group p-8 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-red-200 transition-all duration-300">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-tight">
                    Main Center
                  </p>
                  <p className="text-lg font-bold text-slate-800">
                    123 Health St, Dhaka, BD
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Modern Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[2rem] shadow-2xl shadow-red-100/50 p-8 md:p-12 border border-slate-50 relative overflow-hidden">
              {/* Decorative Circle */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-50 rounded-full blur-3xl"></div>

              <form className="relative z-10 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold text-slate-600">
                        Full Name
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="input input-bordered bg-slate-50 border-none focus:ring-2 focus:ring-red-500 rounded-2xl h-14"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold text-slate-600">
                        Email Address
                      </span>
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="input input-bordered bg-slate-50 border-none focus:ring-2 focus:ring-red-500 rounded-2xl h-14"
                      required
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold text-slate-600">
                      Subject
                    </span>
                  </label>
                  <select className="select select-bordered bg-slate-50 border-none focus:ring-2 focus:ring-red-500 rounded-2xl h-14">
                    <option>General Inquiry</option>
                    <option>Want to Donate Blood</option>
                    <option>Urgent Blood Request</option>
                    <option>Report an Issue</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold text-slate-600">
                      Your Message
                    </span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered bg-slate-50 border-none focus:ring-2 focus:ring-red-500 rounded-2xl h-32 py-4"
                    placeholder="How can we help you save a life?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-error w-full h-14 rounded-2xl text-white font-bold text-lg shadow-lg shadow-red-200 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Send Message
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
