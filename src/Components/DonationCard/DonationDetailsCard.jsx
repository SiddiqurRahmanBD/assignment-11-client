import React, { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthContext";
import useAxios from "../../Hooks/useAxios";
import {
  Calendar,
  Clock,
  MapPin,
  Hospital,
  User,
  Mail,
  MessageSquare,
  Droplets,
} from "lucide-react";

const DonationDetailsCard = ({ details }) => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const [open, setOpen] = useState(false);

  const handleConfirmDonation = async () => {
    try {
      await axiosInstance.patch(`/donations/${details._id}`, {
        donationStatus: "inprogress",
        donorName: user?.displayName,
        donorEmail: user?.email,
      });
      setOpen(false);
      // Replace with a Toast if you have one
      alert("Thank you! Donation confirmed.");
    } catch (error) {
      console.error("Error confirming donation", error);
    }
  };

  const InfoRow = ({ icon: Icon, label, value, fullWidth = false }) => (
    <div
      className={`flex items-start gap-3 p-3 rounded-lg bg-gray-50/50 ${
        fullWidth ? "col-span-2" : ""
      }`}
    >
      <Icon className="w-5 h-5 text-red-500 mt-0.5" />
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          {label}
        </p>
        <p className="text-gray-900 font-medium">{value || "N/A"}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-2xl shadow-gray-200/50 rounded-3xl overflow-hidden border border-gray-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-red-600 to-rose-500 p-8 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Blood Needed
            </h2>
            <p className="opacity-90 mt-1 flex items-center gap-2">
              <Droplets className="w-4 h-4" /> Priority Request
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
            <span className="text-2xl font-black">{details.bloodGroup}</span>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoRow
            icon={User}
            label="Recipient"
            value={details.recipientName}
          />
          <InfoRow icon={Mail} label="Contact" value={details.requesterEmail} />
          <InfoRow
            icon={Hospital}
            label="Hospital"
            value={details.hospitalName}
          />
          <InfoRow
            icon={MapPin}
            label="Location"
            value={`${details.upzila}, ${details.districtName}`}
          />
          <InfoRow icon={Calendar} label="Date" value={details.donationDate} />
          <InfoRow icon={Clock} label="Time" value={details.donationTime} />
          <InfoRow
            icon={MessageSquare}
            label="Message"
            value={details.requestMessage}
            fullWidth
          />
        </div>

        {/* Action Area */}
        <div className="mt-8 flex items-center justify-between border-t pt-6">
          <div>
            <span className="text-sm text-gray-500">Current Status</span>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`h-2.5 w-2.5 rounded-full animate-pulse ${
                  details.donationStatus === "Pending"
                    ? "bg-orange-500"
                    : "bg-blue-500"
                }`}
              />
              <span className="font-bold text-gray-700 capitalize">
                {details.donationStatus}
              </span>
            </div>
          </div>

          {details.donationStatus === "Pending" && (
            <button
              onClick={() => setOpen(true)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-10 rounded-xl transition-all hover:shadow-lg transform hover:-translate-y-0.5 active:scale-95"
            >
              I Want to Donate
            </button>
          )}
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Confirm Your Donation
            </h3>

            <div className="space-y-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-xs text-gray-500 uppercase font-bold mb-1">
                  Donor Name
                </p>
                <p className="text-gray-800 font-medium">{user?.displayName}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-xs text-gray-500 uppercase font-bold mb-1">
                  Donor Email
                </p>
                <p className="text-gray-800 font-medium">{user?.email}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleConfirmDonation}
                className="w-full bg-red-600 text-white font-bold py-4 rounded-xl hover:bg-red-700 transition-colors"
              >
                Confirm
              </button>
              <button
                onClick={() => setOpen(false)}
                className="w-full bg-white text-gray-500 font-semibold py-2 hover:text-gray-800 transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationDetailsCard;
