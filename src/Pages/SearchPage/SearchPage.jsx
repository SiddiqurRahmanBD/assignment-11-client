import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, MapPin, Droplet } from "lucide-react";
import useAxios from "../../Hooks/useAxios";
import DonationCard from "../../Components/DonationCard/DonationCard";

const SearchPage = () => {
  const [districts, setDistricts] = useState([]);
  const [upzilas, setUpzilas] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const axiosInstance = useAxios();

  useEffect(() => {
    axios.get("/district.json").then((res) => setDistricts(res.data));
    axios.get("/upzila.json").then((res) => setUpzilas(res.data));
  }, []);

  const filteredUpazilas = upzilas.filter((u) => u.district_id === districtId);

  const handleSearch = async (e) => {
    e.preventDefault();
    const form = e.target;

    const bloodGroup = form.bloodGroup.value;

    const districtName = districts.find((d) => d.id === districtId)?.name;
    const upzila = form.upzila.value;

    const searchParams = {};
    if (bloodGroup) searchParams.bloodGroup = bloodGroup;

    if (districtName) searchParams.district = districtName;

    if (upzila) searchParams.upzila = upzila;

    setSearchPerformed(true);

    axiosInstance
      .get("/search-requests", {
        params: searchParams,
      })
      .then((res) => {
        setFilteredDonors(res.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900">Find a Donor</h2>
          <p className="text-slate-500">Search for blood donors in your area</p>
        </div>

        {/* --- Search Form Section --- */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-12">
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
          >
            {/* Blood Group */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600 ml-1">
                Blood Group
              </label>
              <div className="relative">
                <Droplet className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500 w-4 h-4 z-10" />
                <select
                  name="bloodGroup"
                  required
                  className="w-full h-12 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none appearance-none cursor-pointer"
                >
                  <option value="">Select Group</option>
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

            {/* District */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600 ml-1">
                District
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 z-10" />
                <select
                  value={districtId}
                  onChange={(e) => setDistrictId(e.target.value)}
                  className="w-full h-12 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none appearance-none cursor-pointer"
                >
                  <option value="">Select District</option>
                  {districts.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Upazila */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600 ml-1">
                Upazila
              </label>
              <select
                name="upzila"
                disabled={!districtId}
                className="w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none appearance-none cursor-pointer disabled:opacity-50"
              >
                <option value="">Select Upazila</option>
                {filteredUpazilas.map((u) => (
                  <option key={u.id} value={u.name}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-100"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <>
                  <Search className="w-4 h-4" /> Search
                </>
              )}
            </button>
          </form>
        </div>

        {/* --- Results Section --- */}
        <div className="space-y-6">
          {!searchPerformed ? (
            <div className="text-center py-20 bg-slate-100/50 border-2 border-dashed border-slate-200 rounded-[2rem]">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">
                Please enter search criteria to find donors.
              </p>
            </div>
          ) : filteredDonors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDonors.map((donor) => (
                <DonationCard donor={donor} />
                // <div
                //   key={donor._id}
                //   className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                // >
                //   <div className="flex items-center gap-4">
                //     <img
                //       src={donor.photoURL}
                //       alt={donor.name}
                //       className="w-16 h-16 rounded-2xl object-cover border-2 border-red-50"
                //     />
                //     <div>
                //       <h3 className="font-bold text-slate-900">{donor.name}</h3>
                //       <p className="text-xs text-slate-500 flex items-center gap-1">
                //         <MapPin size={12} /> {donor.upzila}, {donor.district}
                //       </p>
                //     </div>
                //     <div className="ml-auto bg-red-50 text-red-600 px-3 py-1 rounded-lg text-sm font-black">
                //       {donor.bloodGroup}
                //     </div>
                //   </div>
                // </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-500 font-bold text-xl">
                No donors found for this criteria.
              </p>
              <p className="text-slate-400">
                Try searching in a different district or blood group.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
