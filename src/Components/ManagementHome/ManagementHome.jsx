import React, { useContext, useEffect, useState } from 'react';

import { AuthContext } from "../../Provider/AuthContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { BiUser, BiDonateHeart, BiBriefcase, BiDroplet } from "react-icons/bi";

const ManagementHome = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFunding: 0,
    totalRequests: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosSecure.get("/admin-stats");
        setStats(res.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, [axiosSecure]);

  return (
    <div className="p-8 space-y-10">
      <section className="bg-gradient-to-r from-red-600 to-red-500 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-red-200">
        <h1 className="text-4xl font-black mb-2">
          Welcome back,
        </h1>
        <p className="text-red-50 opacity-90 font-medium">
          Here is what is happening with the community today.
        </p>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-50 flex items-center gap-6 group hover:border-red-200 transition-all">
          <div className="p-5 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
            <BiUser size={40} />
          </div>
          <div>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
              Total Donors
            </p>
            <h2 className="text-4xl font-black text-slate-800">
              {stats.totalUsers}
            </h2>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-50 flex items-center gap-6 group hover:border-green-200 transition-all">
          <div className="p-5 bg-green-50 text-green-600 rounded-2xl group-hover:bg-green-600 group-hover:text-white transition-all">
            <BiDonateHeart size={40} />
          </div>
          <div>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
              Total Funding
            </p>
            <h2 className="text-4xl font-black text-slate-800">
              ${stats.totalFunding}
            </h2>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-50 flex items-center gap-6 group hover:border-red-200 transition-all">
          <div className="p-5 bg-red-50 text-red-600 rounded-2xl group-hover:bg-red-600 group-hover:text-white transition-all">
            <BiDroplet size={40} />
          </div>
          <div>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
              Requests
            </p>
            <h2 className="text-4xl font-black text-slate-800">
              {stats.totalRequests}
            </h2>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManagementHome;