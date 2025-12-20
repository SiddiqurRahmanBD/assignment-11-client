import React from "react";
import { Calendar, Clock, MapPin, User, ArrowRight } from "lucide-react";
import { Link } from "react-router";

const DonationCard = ({donor}) => {
  const {
    _id,
    recipientName,
    districtName,
    upzila,
    bloodGroup,
    donationDate,
    donationTime,
  } = donor;

  return (
    <div className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm hover:shadow-xl hover:shadow-red-500/5 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="bg-red-50 text-red-600 w-14 h-14 rounded-2xl flex flex-col items-center justify-center border border-red-100">
          <span className="text-xl font-black leading-none">{bloodGroup}</span>
          <span className="text-[10px] uppercase font-bold">Group</span>
        </div>
        <div className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-bold border border-amber-100">
          Pending
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
            <User className="w-4 h-4 text-slate-400" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none">
              Recipient
            </p>
            <h3 className="font-bold text-slate-900">{recipientName}</h3>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
            <MapPin className="w-4 h-4 text-slate-400" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none">
              Location
            </p>
            <p className="text-sm text-slate-600">
              {upzila}, {districtName}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2">
          <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl">
            <Calendar className="w-4 h-4 text-red-400" />
            <span className="text-xs font-medium text-slate-700">
              {donationDate}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl">
            <Clock className="w-4 h-4 text-red-400" />
            <span className="text-xs font-medium text-slate-700">
              {donationTime}
            </span>
          </div>
        </div>
      </div>

      <Link
        to={`/donation-details/${_id}`}
        className="w-full h-12 bg-slate-900 hover:bg-red-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all group-hover:gap-3"
      >
        View Details <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};

export default DonationCard;
