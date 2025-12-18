import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import {
  User,
  Mail,
  MapPin,
  Droplet,
  Calendar,
  Clock,
  Hospital,
  MessageSquare,
  Send,
} from "lucide-react";

const CreateDonationRequest = () => {
  const { user } = useContext(AuthContext);
  const [districts, setDistricts] = useState([]);
  const [upzilas, setUpzilas] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [upzila, setUpzila] = useState("");
  const [loading, setLoading] = useState(false);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axios.get("/district.json").then((res) => setDistricts(res.data));
    axios.get("/upzila.json").then((res) => setUpzilas(res.data));
  }, []);

  useEffect(() => {
    setUpzila("");
  }, [districtId]);

  const filteredUpazilas = upzilas.filter((u) => u.district_id === districtId);

  const handleRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const selectedDistrict = districts.find((d) => d.id === districtId);

    const formdata = {
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      recipientName: form.recipientName.value,
      districtName: selectedDistrict?.name,
      upzila,
      hospitalName: form.hospitalName.value,
      addressLine: form.addressLine.value,
      bloodGroup: form.bloodGroup.value,
      donationDate: form.donationDate.value,
      donationTime: form.donationTime.value,
      requestMessage: form.requestMessage.value,
      donationStatus: "Pending",
    };

    try {
      const res = await axiosSecure.post("/requests", formdata);
      if (res.data.insertedId) {
        toast.success("Blood request posted successfully!");
        form.reset();
        setDistrictId("");
        setUpzila("");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to post request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">
            Create Request
          </h2>
          <p className="text-slate-500 mt-2 font-medium">
            Fill in the details to find a life-saving donor.
          </p>
        </div>

        <form onSubmit={handleRequest} className="space-y-8">
          {/* Section 1: Identity (Read Only) */}
          <div className="bg-white/70 backdrop-blur-xl border border-slate-100 rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/40">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <User size={16} /> Requester Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 ml-1">
                  Your Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                  <input
                    type="text"
                    value={user?.displayName || ""}
                    readOnly
                    className="w-full h-14 pl-12 bg-slate-50 border border-slate-100 rounded-2xl text-slate-400 cursor-not-allowed outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 ml-1">
                  Your Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                  <input
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    className="w-full h-14 pl-12 bg-slate-50 border border-slate-100 rounded-2xl text-slate-400 cursor-not-allowed outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Patient & Location Info */}
          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/40">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Hospital size={16} /> Patient & Hospital Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Recipient Name
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors w-5 h-5" />
                  <input
                    name="recipientName"
                    required
                    placeholder="Who needs the blood?"
                    className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-red-500/10 focus:border-red-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  District
                </label>
                <select
                  value={districtId}
                  onChange={(e) => setDistrictId(e.target.value)}
                  required
                  className="w-full h-14 px-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-red-500/10 focus:border-red-500 outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    Select District
                  </option>
                  {districts.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Upazila
                </label>
                <select
                  value={upzila}
                  onChange={(e) => setUpzila(e.target.value)}
                  required
                  disabled={!districtId}
                  className="w-full h-14 px-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-red-500/10 focus:border-red-500 outline-none transition-all appearance-none cursor-pointer disabled:opacity-50"
                >
                  <option value="" disabled>
                    Select Upazila
                  </option>
                  {filteredUpazilas.map((u) => (
                    <option key={u.id} value={u.name}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Hospital Name
                </label>
                <div className="relative group">
                  <Hospital className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors w-5 h-5" />
                  <input
                    name="hospitalName"
                    required
                    placeholder="e.g. Dhaka Medical College Hospital"
                    className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-red-500/10 focus:border-red-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Full Address
                </label>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors w-5 h-5" />
                  <input
                    name="addressLine"
                    required
                    placeholder="Floor, Ward, Zahir Raihan Rd, etc."
                    className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-red-500/10 focus:border-red-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Requirements */}
          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/40">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Droplet size={16} /> Blood & Timing
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Blood Group
                </label>
                <div className="relative">
                  <Droplet className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 w-5 h-5 z-10" />
                  <select
                    name="bloodGroup"
                    required
                    className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-red-500/10 focus:border-red-500 outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled selected>
                      Group
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
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Donation Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="date"
                    name="donationDate"
                    required
                    className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-red-500/10 focus:border-red-500 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Time
                </label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="time"
                    name="donationTime"
                    required
                    className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-red-500/10 focus:border-red-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2 mt-6">
              <label className="text-sm font-bold text-slate-700 ml-1">
                Request Message
              </label>
              <div className="relative group">
                <MessageSquare className="absolute left-4 top-4 text-slate-400 group-focus-within:text-red-500 transition-colors w-5 h-5" />
                <textarea
                  name="requestMessage"
                  required
                  rows="4"
                  placeholder="Briefly explain the urgency..."
                  className="w-full p-4 pl-12 bg-slate-50 border border-slate-100 rounded-3xl focus:bg-white focus:ring-2 focus:ring-red-500/10 focus:border-red-500 outline-none transition-all resize-none"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            disabled={loading}
            type="submit"
            className="w-full h-16 bg-red-600 hover:bg-red-700 text-white rounded-[2rem] font-bold text-xl shadow-xl shadow-red-200 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70 group"
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <>
                <Send
                  size={22}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />{" "}
                Post Request
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDonationRequest;
