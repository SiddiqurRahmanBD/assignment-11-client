import React, { useContext, useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import { AuthContext } from "../../Provider/AuthContext";
import { BiHeart, BiDollarCircle, BiHistory, BiStats } from "react-icons/bi";

const FundingPage = () => {
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/payment-history")
      .then((res) => {
        setHistory(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [axiosInstance]);

  const totalFunds = history.reduce((sum, item) => sum + (item.amount || 0), 0);

  const handlePayment = (e) => {
    e.preventDefault();
    const formData = {
      donateAmount: e.target.donateAmount.value,
      donorName: user?.displayName,
      donorEmail: user?.email,
    };

    axiosInstance
      .post("/create-payment-chechout", formData)
      .then((res) => {
        if (res.data.url) window.location.href = res.data.url;
      })
      .catch((err) => console.error("Payment Error:", err));
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            Funding Portal
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Your generosity powers our life-saving missions. Every dollar helps
            us reach those in need.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1 space-y-6 sticky top-8">
            <div className="bg-white rounded-[2rem] shadow-xl shadow-red-100/50 p-8 border border-red-50">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-red-100 rounded-2xl text-red-600">
                  <BiHeart size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Make a Donation</h3>
                  <p className="text-xs text-gray-400">Secure Stripe Payment</p>
                </div>
              </div>

              <form onSubmit={handlePayment} className="space-y-4">
                <div className="relative">
                  <BiDollarCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    name="donateAmount"
                    type="number"
                    required
                    placeholder="Enter amount"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-red-500 outline-none font-bold text-lg transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-red-200 transition-all active:scale-95"
                >
                  Donate Now
                </button>
              </form>
            </div>
            <div className="bg-slate-900 rounded-[2rem] p-8 text-white">
              <div className="flex items-center gap-3 opacity-60 mb-2">
                <BiStats />{" "}
                <span className="text-xs font-bold uppercase tracking-widest">
                  Global Impact
                </span>
              </div>
              <div className="text-3xl font-black">
                ${totalFunds.toLocaleString()}
              </div>
              <div className="text-sm opacity-50 mt-1">
                Total Funds Collected
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BiHistory className="text-slate-400 text-xl" />
                  <h2 className="font-black text-slate-800 uppercase text-sm tracking-tighter">
                    Recent Contributions
                  </h2>
                </div>
                <span className="bg-slate-100 text-slate-500 text-[10px] font-black px-3 py-1 rounded-full">
                  {history.length} Transactions
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                      <th className="py-4 pl-8">Donor</th>
                      <th className="py-4">Amount</th>
                      <th className="py-4 pr-8">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {history.map((item) => (
                      <tr
                        key={item?._id}
                        className="hover:bg-slate-50/50 transition-colors group"
                      >
                        <td className="py-5 pl-8">
                          <div className="font-bold text-slate-700">
                            {item?.donorName || "Anonymous"}
                          </div>
                        </td>
                        <td className="py-5">
                          <span className="font-black text-green-600">
                            ${item?.amount}
                          </span>
                        </td>
                        <td className="py-5 pr-8 text-slate-400 text-sm">
                          {item?.paidAt
                            ? new Date(item.paidAt).toLocaleDateString()
                            : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {history.length === 0 && !loading && (
                  <div className="py-20 text-center text-slate-400 font-medium">
                    No donations found yet. Be the first!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundingPage;
