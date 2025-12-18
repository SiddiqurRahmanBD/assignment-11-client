import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import {
  User,
  Mail,
  MapPin,
  Droplet,
  Edit3,
  Save,
  X,
  Camera,
} from "lucide-react";
import { toast } from "react-toastify";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [profile, setProfile] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.email) return;
    axiosSecure.get("/user/profile").then((res) => {
      setProfile(res.data);
    });
  }, [axiosSecure, user?.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await axiosSecure.put("/user/profile", profile);
      toast.success("Profile updated successfully!");
      setIsEdit(false);
    } catch (err) {
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFEFF] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">
              My Profile
            </h2>
            <p className="text-slate-500 mt-2 font-medium">
              Manage your donor information and preferences.
            </p>
          </div>

          <div className="flex gap-3">
            {!isEdit ? (
              <button
                onClick={() => setIsEdit(true)}
                className="btn border-none bg-red-50 text-red-600 hover:bg-red-100 px-6 rounded-2xl font-bold flex items-center gap-2 transition-all"
              >
                <Edit3 size={18} /> Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={() => setIsEdit(false)}
                  className="btn border-none bg-slate-100 text-slate-600 hover:bg-slate-200 px-6 rounded-2xl font-bold flex items-center gap-2"
                >
                  <X size={18} /> Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  disabled={loading}
                  className="btn border-none bg-red-600 text-white hover:bg-red-700 px-8 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-red-200"
                >
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    <>
                      <Save size={18} /> Save Changes
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Avatar Card */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 flex flex-col items-center text-center">
              <div className="relative group">
                <img
                  src={profile?.photoURL || user?.photoURL}
                  alt="Avatar"
                  className="w-32 h-32 rounded-[2rem] object-cover ring-4 ring-red-50 shadow-lg"
                />
                {isEdit && (
                  <div className="absolute inset-0 bg-black/40 rounded-[2rem] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Camera className="text-white" />
                  </div>
                )}
              </div>
              <h3 className="mt-6 text-xl font-bold text-slate-800">
                {profile?.name || "Life Saver"}
              </h3>
              <p className="text-red-600 font-bold text-sm bg-red-50 px-4 py-1 rounded-full mt-2">
                {profile?.bloodGroup || "O+"} Donor
              </p>
              <div className="w-full border-t border-slate-50 mt-6 pt-6 space-y-3">
                <div className="flex items-center gap-3 text-slate-500 text-sm justify-center">
                  <ShieldCheck size={16} className="text-green-500" /> Verified
                  Donor
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form Fields */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-xl border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-slate-200/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">
                    Full Name
                  </label>
                  <div className="relative group">
                    <User
                      className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                        isEdit ? "text-red-500" : "text-slate-400"
                      }`}
                    />
                    <input
                      name="name"
                      value={profile?.name || ""}
                      onChange={handleChange}
                      disabled={!isEdit}
                      className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all disabled:opacity-70"
                    />
                  </div>
                </div>

                {/* Email (Locked) */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 ml-1">
                    Email (Account ID)
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                    <input
                      value={profile?.email || user?.email || ""}
                      disabled
                      className="w-full h-14 pl-12 pr-4 bg-slate-100 border border-slate-200 rounded-2xl text-slate-400 cursor-not-allowed outline-none"
                    />
                  </div>
                </div>

                {/* District */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">
                    District
                  </label>
                  <div className="relative group">
                    <MapPin
                      className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                        isEdit ? "text-red-500" : "text-slate-400"
                      }`}
                    />
                    <input
                      name="district"
                      value={profile?.district || ""}
                      onChange={handleChange}
                      disabled={!isEdit}
                      className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all disabled:opacity-70"
                    />
                  </div>
                </div>

                {/* Upazila */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">
                    Upazila
                  </label>
                  <div className="relative group">
                    <MapPin
                      className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                        isEdit ? "text-red-500" : "text-slate-400"
                      }`}
                    />
                    <input
                      name="upzila"
                      value={profile?.upzila || ""}
                      onChange={handleChange}
                      disabled={!isEdit}
                      className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all disabled:opacity-70"
                    />
                  </div>
                </div>

                {/* Blood Group Select */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">
                    Blood Group
                  </label>
                  <div className="relative">
                    <Droplet
                      className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 z-10 ${
                        isEdit ? "text-red-500" : "text-slate-400"
                      }`}
                    />
                    <select
                      name="bloodGroup"
                      value={profile?.bloodGroup || ""}
                      onChange={handleChange}
                      disabled={!isEdit}
                      className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all appearance-none disabled:opacity-70"
                    >
                      <option value="">Select Group</option>
                      {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                        (g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper internal icon for verification
const ShieldCheck = ({ size, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export default Profile;
