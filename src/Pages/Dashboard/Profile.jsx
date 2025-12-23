import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import {
  IoCloudUploadOutline,
  IoPersonOutline,
  IoLocationOutline,
  IoWaterOutline,
  IoMailOutline,
  IoCreateOutline,
  IoCloseOutline,
} from "react-icons/io5";

const Profile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [isEditable, setIsEditable] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState("");

  const [previewImage, setPreviewImage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    upzila: "",
    bloodGroup: "",
  });

  // ================= FETCH DATA =================
  useEffect(() => {
    axios.get("/district.json").then((res) => setDistricts(res.data));
    axios.get("/upzila.json").then((res) => setUpazilas(res.data));

    axiosSecure.get("/user/profile").then((res) => {
      setUserData(res.data);
    });
  }, [axiosSecure]);

  // ================= SYNC FORM =================
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        upzila: userData.upzila || "",
        bloodGroup: userData.bloodGroup || "",
      });

      const dist = districts.find((d) => d.name === userData.district);
      if (dist) setSelectedDistrictId(dist.id);
    }
  }, [userData, districts]);

  const filteredUpazilas = upazilas.filter(
    (u) => u.district_id === selectedDistrictId
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalPhotoURL = userData?.photoURL;

      if (e.target.photo?.files?.[0]) {
        const imgData = new FormData();
        imgData.append("image", e.target.photo.files[0]);

        const imgRes = await axios.post(
          "https://api.imgbb.com/1/upload?key=80872c72797ec82a69fc4e1b1174a045",
          imgData
        );

        finalPhotoURL = imgRes.data.data.display_url;
      }

      const updatedInfo = {
        name: formData.name,
        district: districts.find((d) => d.id === selectedDistrictId)?.name,
        upzila: formData.upzila,
        bloodGroup: formData.bloodGroup,
        photoURL: finalPhotoURL,
      };

      const res = await axiosSecure.patch(
        `/profile-update/${user?.email}`,
        updatedInfo
      );

      if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
        await updateUser({
          displayName: updatedInfo.name,
          photoURL: finalPhotoURL,
        });

        setUserData({ ...userData, ...updatedInfo });
        setIsEditable(false);
        setPreviewImage(null);

        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Profile update failed", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!userData || !districts.length) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-ring loading-lg text-rose-500"></span>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto my-12 px-4">
      <div className="bg-base-100 rounded-3xl shadow-2xl overflow-hidden border border-base-200">
        {/* ================= HEADER BORDER/COVER ================= */}
        <div className="h-40 bg-gradient-to-br from-rose-500 via-red-600 to-red-700 relative">
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
            <div className="relative group">
              <div className="p-1 bg-white rounded-full shadow-lg">
                <img
                  src={previewImage || userData.photoURL || user?.photoURL}
                  className="w-32 h-32 rounded-full object-cover"
                  alt="Profile"
                />
              </div>

              {isEditable && (
                <label className="absolute inset-1 bg-black/50 rounded-full flex flex-col items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-2 border-dashed border-white/50">
                  <IoCloudUploadOutline className="text-white text-2xl" />
                  <span className="text-[10px] text-white font-medium">
                    CHANGE
                  </span>
                  <input
                    type="file"
                    name="photo"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="pt-20 px-8 pb-10">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black text-gray-800 tracking-tight">
              {userData.name}
            </h2>
            <p className="text-sm text-gray-500 font-medium flex items-center justify-center gap-1 mt-1">
              <IoMailOutline /> {userData.email}
            </p>

            <div className="mt-4 flex justify-center">
              {!isEditable ? (
                <button
                  onClick={() => setIsEditable(true)}
                  className="btn btn-sm btn-outline rounded-full px-6 border-gray-300 hover:bg-rose-500 hover:border-rose-500"
                >
                  <IoCreateOutline className="text-lg" /> Edit Profile
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsEditable(false);
                    setPreviewImage(null);
                  }}
                  className="btn btn-sm btn-ghost rounded-full text-gray-400 hover:text-red-500"
                >
                  <IoCloseOutline className="text-lg" /> Cancel Edit
                </button>
              )}
            </div>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-5">
            {/* Input Wrapper Component-style */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-bold text-gray-600 flex items-center gap-2">
                    <IoPersonOutline /> Full Name
                  </span>
                </label>
                <input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  disabled={!isEditable}
                  className={`input input-md ${
                    isEditable
                      ? "input-bordered border-rose-100 focus:border-rose-500"
                      : "bg-gray-50 border-none"
                  } rounded-xl transition-all`}
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-bold text-gray-600 flex items-center gap-2">
                    <IoWaterOutline className="text-red-500" /> Blood Group
                  </span>
                </label>
                <select
                  value={formData.bloodGroup}
                  disabled={!isEditable}
                  onChange={(e) =>
                    setFormData({ ...formData, bloodGroup: e.target.value })
                  }
                  className={`select select-md ${
                    isEditable
                      ? "select-bordered border-rose-100"
                      : "bg-gray-50 border-none"
                  } rounded-xl transition-all`}
                >
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                    (bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-bold text-gray-600 flex items-center gap-2">
                    <IoLocationOutline /> District
                  </span>
                </label>
                <select
                  value={selectedDistrictId}
                  disabled={!isEditable}
                  onChange={(e) => setSelectedDistrictId(e.target.value)}
                  className={`select select-md ${
                    isEditable
                      ? "select-bordered border-rose-100"
                      : "bg-gray-50 border-none"
                  } rounded-xl transition-all`}
                >
                  <option value="">Select District</option>
                  {districts.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-bold text-gray-600 flex items-center gap-2">
                    <IoLocationOutline /> Upazila
                  </span>
                </label>
                <select
                  value={formData.upzila}
                  disabled={!isEditable || !selectedDistrictId}
                  onChange={(e) =>
                    setFormData({ ...formData, upzila: e.target.value })
                  }
                  className={`select select-md ${
                    isEditable
                      ? "select-bordered border-rose-100"
                      : "bg-gray-50 border-none"
                  } rounded-xl transition-all`}
                >
                  <option value="">Select Upazila</option>
                  {filteredUpazilas.map((u) => (
                    <option key={u.id} value={u.name}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {isEditable && (
              <div className="pt-4">
                <button
                  disabled={loading}
                  className="btn w-full border-none bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-rose-200 rounded-xl normal-case text-lg transition-all"
                >
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Update Profile"
                  )}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
