import React, { useContext, useState, useEffect } from "react";
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

  // State for immediate image preview
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    axios.get("/district.json").then((res) => setDistricts(res.data));
    axios.get("/upzila.json").then((res) => setUpazilas(res.data));

    axiosSecure
      .get("/user/profile")
      .then((res) => setUserData(res.data))
      .catch((err) => console.error("Error fetching profile:", err));
  }, [axiosSecure]);

  useEffect(() => {
    if (userData && districts.length > 0) {
      const d = districts.find((dist) => dist.name === userData.district);
      if (d) setSelectedDistrictId(d.id);
    }
  }, [userData, districts]);

  const filteredUpazilas = upazilas.filter(
    (u) => u.district_id === selectedDistrictId
  );

  // Handle Image Selection Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;

    // FIX: Safely access photo files only if the input exists in the DOM
    const imageFile = form.photo?.files ? form.photo.files[0] : null;

    try {
      let finalPhotoURL = userData?.photoURL;
      if (imageFile) {
        const imgData = new FormData();
        imgData.append("image", imageFile);
        const imgRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=80872c72797ec82a69fc4e1b1174a045`,
          imgData
        );
        finalPhotoURL = imgRes.data.data.display_url;
      }

      const updatedInfo = {
        name: form.name.value,
        district: districts.find((d) => d.id === selectedDistrictId)?.name,
        upzila: form.upzila.value,
        bloodGroup: form.bloodGroup.value,
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
        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          showConfirmButton: false,
          timer: 1500,
        });
        setUserData({ ...userData, ...updatedInfo });
        setIsEditable(false);
        setPreviewImage(null);
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Update failed", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!userData || districts.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] space-y-4">
        <span className="loading loading-infinity loading-lg text-red-600"></span>
        <p className="text-gray-500 font-medium animate-pulse">
          Loading your life-saving profile...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-12 px-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="h-32 bg-gradient-to-r from-red-500 to-rose-600 relative">
          <div className="absolute -bottom-12 left-8">
            <div className="relative group">
              <img
                src={previewImage || userData?.photoURL || user?.photoURL}
                alt="Profile"
                className="w-32 h-32 rounded-2xl border-4 border-white object-cover shadow-lg bg-white"
              />
              {isEditable && (
                <label className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                  <IoCloudUploadOutline className="text-white text-3xl" />
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

        <div className="pt-16 pb-8 px-8">
          <div className="flex justify-between items-start mb-10">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-800">
                {userData.name}
              </h2>
              <p className="text-red-600 font-medium flex items-center gap-1">
                <IoWaterOutline /> Blood Donor Member
              </p>
            </div>
            {!isEditable ? (
              <button
                onClick={() => setIsEditable(true)}
                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all shadow-sm"
              >
                Edit Profile
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsEditable(false);
                  setPreviewImage(null);
                }}
                className="px-6 py-2 bg-gray-100 text-gray-500 rounded-xl font-semibold transition-all"
              >
                Cancel
              </button>
            )}
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 flex items-center gap-2 uppercase tracking-wider">
                  <IoPersonOutline className="text-red-500" /> Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={userData.name}
                  disabled={!isEditable}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all outline-none font-medium ${
                    isEditable
                      ? "border-red-100 focus:border-red-500 bg-white"
                      : "border-transparent bg-gray-50 text-gray-700"
                  }`}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 flex items-center gap-2 uppercase tracking-wider">
                  <IoMailOutline className="text-red-500" /> Email Address
                </label>
                <input
                  type="email"
                  value={userData.email}
                  disabled
                  className="w-full px-4 py-3 rounded-xl border-2 border-transparent bg-gray-50 text-gray-400 cursor-not-allowed font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 flex items-center gap-2 uppercase tracking-wider">
                  <IoLocationOutline className="text-red-500" /> District
                </label>
                <select
                  disabled={!isEditable}
                  value={selectedDistrictId}
                  onChange={(e) => setSelectedDistrictId(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all outline-none appearance-none font-medium ${
                    isEditable
                      ? "border-red-100 focus:border-red-500 bg-white"
                      : "border-transparent bg-gray-50 text-gray-700"
                  }`}
                >
                  <option value="">Select District</option>
                  {districts.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 flex items-center gap-2 uppercase tracking-wider">
                  <IoLocationOutline className="text-red-500" /> Upazila
                </label>
                <select
                  disabled={!isEditable || !selectedDistrictId}
                  name="upzila"
                  defaultValue={userData.upzila}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all outline-none appearance-none font-medium ${
                    isEditable
                      ? "border-red-100 focus:border-red-500 bg-white"
                      : "border-transparent bg-gray-50 text-gray-700"
                  }`}
                >
                  <option value="">Select Upazila</option>
                  {filteredUpazilas.map((u) => (
                    <option key={u.id} value={u.name}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Blood Group */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 flex items-center gap-2 uppercase tracking-wider">
                  <IoWaterOutline className="text-red-500" /> Blood Group
                </label>
                <select
                  disabled={!isEditable}
                  name="bloodGroup"
                  defaultValue={userData.bloodGroup}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all outline-none appearance-none font-extrabold text-red-600 ${
                    isEditable
                      ? "border-red-100 focus:border-red-500 bg-white"
                      : "border-transparent bg-gray-50"
                  }`}
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

            {isEditable && (
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-max px-12 bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-red-100 transition-all active:scale-95 disabled:opacity-50"
                >
                  {loading ? "Saving Changes..." : "Update Profile"}
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
