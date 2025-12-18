import React from "react";
import { Heart, UserPlus, Search, Users, ArrowRight } from "lucide-react";

const features = [
  {
    title: "Save Lives",
    description:
      "One donation can save up to three lives. Your contribution provides a lifeline to those in critical need.",
    icon: <Heart className="w-8 h-8" />,
    color: "bg-red-50 text-red-600",
    hover: "group-hover:bg-red-600 group-hover:text-white",
  },
  {
    title: "Easy Registration",
    description:
      "Create your profile in seconds. Keep track of your donation history and stay ready to help.",
    icon: <UserPlus className="w-8 h-8" />,
    color: "bg-blue-50 text-blue-600",
    hover: "group-hover:bg-blue-600 group-hover:text-white",
  },
  {
    title: "Search Donors",
    description:
      "Advanced filtering helps you find blood donors in your specific location within minutes.",
    icon: <Search className="w-8 h-8" />,
    color: "bg-amber-50 text-amber-600",
    hover: "group-hover:bg-amber-600 group-hover:text-white",
  },
  {
    title: "Community Impact",
    description:
      "Join thousands of heroes. Participate in local camps and raise awareness for blood donation.",
    icon: <Users className="w-8 h-8" />,
    color: "bg-emerald-50 text-emerald-600",
    hover: "group-hover:bg-emerald-600 group-hover:text-white",
  },
];

const FeaturedSection = () => {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-12 left-10 w-72 h-72 bg-red-100 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-12 right-10 w-72 h-72 bg-blue-100 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-red-600 font-bold tracking-widest uppercase text-sm mb-3">
            Our Mission
          </h2>
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
            Why Join Our Blood Donation Community?
          </h3>
          <p className="text-slate-500 text-lg leading-relaxed">
            We are building a seamless ecosystem that connects donors with
            patients instantly. Every second counts when it comes to saving
            lives.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Decorative background element on hover */}
              <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-slate-50 rounded-full group-hover:scale-[3] transition-transform duration-700 pointer-events-none"></div>

              <div className="relative z-10">
                {/* Icon Box */}
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 ${feature.color} ${feature.hover}`}
                >
                  {feature.icon}
                </div>

                <h4 className="text-2xl font-bold text-slate-800 mb-4">
                  {feature.title}
                </h4>

                <p className="text-slate-500 leading-relaxed mb-6">
                  {feature.description}
                </p>

                <div className="flex items-center text-slate-400 font-bold text-sm group-hover:text-slate-900 transition-colors cursor-pointer">
                  LEARN MORE{" "}
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
