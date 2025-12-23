import { CheckCircle, Heart, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

const DonateSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:scale-[1.01] duration-300">
        <div className="h-3 w-full bg-gradient-to-r from-green-400 to-emerald-600" />

        <div className="p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-2">Thank You!</h2>
          <p className="text-lg text-gray-600 mb-6">
            Your donation is confirmed.
          </p>

          <p className="text-gray-500 text-sm mb-8 leading-relaxed">
            Your generosity helps us continue our mission. A receipt has been
            sent to your email address.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => navigate("/")}
              className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors shadow-lg"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Return Home
            </button>

            <button
              onClick={() => navigate("/donation-requests")}
              className="w-full inline-flex justify-center items-center px-6 py-3 border border-gray-200 text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors"
            >
              <Heart className="mr-2 h-5 w-5 text-rose-500" />
              Make Another Donation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonateSuccess;
