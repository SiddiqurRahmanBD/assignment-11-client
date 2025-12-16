import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthContext";
import axios from "axios";
import useAxios from "../../Hooks/useAxios";
import { toast } from "react-toastify";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const CreateDonationRequest = () => {
  const { user } = useContext(AuthContext);

  const [districts, setDistricts] = useState([]);
  const [upzilas, setUpzilas] = useState([]);

  const [districtId, setDistrictId] = useState("");
  const [upzila, setUpzila] = useState("");

  // const axiosInstance = useAxios()
  const axiosSecure = useAxiosSecure();

  // Fetch district & upazila data
  useEffect(() => {
    axios
      .get("/district.json")
      .then((res) => setDistricts(res.data))
      .catch((err) => console.log("District error:", err));

    axios
      .get("/upzila.json")
      .then((res) => setUpzilas(res.data))
      .catch((err) => console.log("Upazila error:", err));
  }, []);

  // Reset upazila when district changes
  useEffect(() => {
    setUpzila("");
  }, [districtId]);

  // Filter upazilas by district
  const filteredUpazilas = upzilas.filter((u) => u.district_id === districtId);

  // Submit handler
  const handleRequest = (e) => {
    e.preventDefault();
    const form = e.target;

    const selectedDistrict = districts.find((d) => d.id === districtId);

    const formdata = {
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      recipientName: form.recipientName.value,
      districtName: selectedDistrict?.name,
      upzila,
      hospitalName: form.hospitalName.value,
      addressLine: form.addressLine.value,
      bloodGroup: form.bloodGroup.value,
      donationDate: form.donationDate.value,
      donationTime: form.donationTime.value,
      requestMessage: form.requestMessage.value,
      donationStatus: 'Pending'
    };

    axiosSecure.post("/requests", formdata).then((res) => {
      if (res.data.insertedId) {
        toast.success("Request successfully created");
        form.reset();
        setDistrictId("");
        setUpzila("");
      }
    });
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Blood Donation Request
        </h2>

        <form onSubmit={handleRequest} className="space-y-5">
          {/* Requester Info */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Requester Name
            </label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="w-full bg-gray-100 border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Requester Email
            </label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full bg-gray-100 border rounded px-3 py-2"
            />
          </div>

          {/* Recipient */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Recipient Name
            </label>
            <input
              type="text"
              name="recipientName"
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* District & Upazila */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">District</label>
              <select
                value={districtId}
                onChange={(e) => setDistrictId(e.target.value)}
                required
                className="w-full border rounded px-3 py-2"
              >
                <option value="" disabled>
                  Select District
                </option>
                {districts.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Upazila</label>
              <select
                value={upzila}
                onChange={(e) => setUpzila(e.target.value)}
                required
                disabled={!districtId}
                className="w-full border rounded px-3 py-2"
              >
                <option value="" disabled>
                  Select Upazila
                </option>
                {filteredUpazilas.map((u) => (
                  <option key={u.id} value={u.name}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Hospital */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Hospital Name
            </label>
            <input
              type="text"
              name="hospitalName"
              required
              className="w-full border rounded px-3 py-2"
              placeholder="Dhaka Medical College Hospital"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Full Address
            </label>
            <input
              type="text"
              name="addressLine"
              required
              className="w-full border rounded px-3 py-2"
              placeholder="Zahir Raihan Rd, Dhaka"
            />
          </div>

          {/* Blood Group */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Blood Group
            </label>
            <select
              name="bloodGroup"
              required
              className="w-full border rounded px-3 py-2"
            >
              <option value="" disabled>
                Select Blood Group
              </option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Donation Date
              </label>
              <input
                type="date"
                name="donationDate"
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Donation Time
              </label>
              <input
                type="time"
                name="donationTime"
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Request Message
            </label>
            <textarea
              name="requestMessage"
              rows="4"
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded font-medium hover:bg-red-700"
          >
            Request Blood
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDonationRequest;
