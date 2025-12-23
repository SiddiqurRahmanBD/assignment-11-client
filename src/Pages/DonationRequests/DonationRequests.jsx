import React, { useEffect, useState } from "react";
import DonationCard from "../../Components/DonationCard/DonationCard";
import useAxios from "../../Hooks/useAxios";

const DonationRequests = () => {
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();
  useEffect(() => {
    axiosInstance
      .get("all-pending-requests")
      .then((res) => {
        setFilteredDonors(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [axiosInstance]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8 text-center md:text-left">
        <h2 className="text-3xl font-bold text-slate-900">
          Pending Donation Requests
        </h2>
        <p className="text-slate-500 mt-2">
          Help someone today by accepting a request
        </p>
      </div>
      {loading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg text-red-600"></span>
        </div>
      ) : filteredDonors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDonors.map((donor) => (
            <DonationCard key={donor?._id} donor={donor} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <p className="text-slate-500 text-lg font-medium">
            No pending requests found at the moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default DonationRequests;
