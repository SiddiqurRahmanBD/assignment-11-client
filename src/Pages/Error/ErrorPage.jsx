import React from "react";
import errorImage from "../../assets/404.png";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-6">
        <div className="max-w-4xl w-full">
          <div className="flex justify-center items-center  transform transition-all duration-700 ease-in-out">
            <img
              src={errorImage}
              alt="404 Error"
              className="w-full max-w-md h-auto object-contain drop-shadow-xl"
            />
          </div>

          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight">
                Oops! <span className="text-red-600">Page not found.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-500 font-medium max-w-lg mx-auto leading-relaxed">
                The link you followed might be broken, or the page may have been
                removed.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
              <Link
                to="/"
                className="w-full sm:w-auto px-10 py-4 bg-gray-900 text-white rounded-full font-bold text-lg shadow-lg hover:bg-red-600 transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
              >
                Return Home
              </Link>
              <button
                onClick={() => window.history.back()}
                className="w-full sm:w-auto px-10 py-4 bg-white text-gray-700 border-2 border-gray-200 rounded-full font-bold text-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 active:scale-95"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ErrorPage;
