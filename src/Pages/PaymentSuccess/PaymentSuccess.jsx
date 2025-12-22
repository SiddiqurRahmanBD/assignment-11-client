import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";
import useAxios from "../../Hooks/useAxios";
import { FaCheckCircle } from "react-icons/fa"; // Run: npm install react-icons

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosInstance = useAxios();
  const [status, setStatus] = useState("verifying"); // verifying, success, error

  useEffect(() => {
    if (sessionId) {
      axiosInstance
        .post(`/success-payment?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          setStatus("success");
        })
        .catch((err) => {
          console.error(err);
          setStatus("error");
        });
    }
  }, [sessionId, axiosInstance]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-2xl text-center transform transition-all hover:scale-105">
        {status === "verifying" ? (
          <div className="animate-pulse">
            <div className="h-16 w-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-700">
              Verifying Payment...
            </h2>
          </div>
        ) : status === "success" ? (
          <>
            <div className="flex justify-center mb-6">
              <FaCheckCircle className="text-green-500 text-7xl animate-bounce" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
              Thank You!
            </h1>
            <p className="text-gray-600 mb-8">
              Your donation was successful. Your contribution helps save lives.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                to="/donation-requests"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg"
              >
                View Requests
              </Link>
              <Link
                to="/"
                className="text-gray-500 hover:text-red-600 font-medium underline"
              >
                Back to Home
              </Link>
            </div>
          </>
        ) : (
          <div className="text-red-500">
            <h2 className="text-2xl font-bold">Something went wrong</h2>
            <p className="mb-4">We couldn't verify your payment.</p>
            <Link to="/" className="btn btn-outline">
              Go Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
