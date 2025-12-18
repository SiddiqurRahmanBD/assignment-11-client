import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Provider/AuthContext";
import Swal from "sweetalert2";

const DonorHome = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [recentRequests, setRecentRequests] = useState([]);

  const fetchRecentRequests = () => {
    axiosSecure
      .get("/my-recent-requests")
      .then((res) => setRecentRequests(res.data));
  };

  useEffect(() => {
    fetchRecentRequests();
  }, [axiosSecure]);

  const handleStatusUpdate = async (id, status) => {
    const res = await axiosSecure.patch(`/donation-request/status/${id}`, {
      status,
    });
    if (res.data.modifiedCount > 0) {
      fetchRecentRequests();
      Swal.fire("Success", `Request marked as ${status}`, "success");
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Request?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      confirmButtonText: "Yes, delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/donation-request/${id}`).then(() => {
          fetchRecentRequests();
          Swal.fire("Deleted", "Your request has been removed.", "success");
        });
      }
    });
  };

  return (
    <div className="space-y-8 p-4 md:p-8">
      {/* Welcome & Stats Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-red-50 to-white p-8 rounded-2xl border border-red-100">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-800">
            Welcome back,{" "}
            <span className="text-red-600">{user?.displayName}</span>! 👋
          </h2>
          <p className="text-gray-500 mt-1">
            Here is a quick look at your recent activity.
          </p>
        </div>
        <div className="stats shadow bg-white border border-gray-100">
          <div className="stat px-8">
            <div className="stat-title text-gray-500 uppercase text-xs font-bold tracking-widest">
              Recent Activity
            </div>
            <div className="stat-value text-red-600 text-3xl">
              {recentRequests.length}
            </div>
            <div className="stat-desc mt-1">Donation Requests</div>
          </div>
        </div>
      </header>

      {/* Recent Requests Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <span className="w-2 h-6 bg-red-600 rounded-full"></span>
            My Recent Requests
          </h3>
          <button
            onClick={() => navigate("/dashboard/my-donation-requests")}
            className="btn btn-sm btn-ghost text-red-600 hover:bg-red-50"
          >
            View All →
          </button>
        </div>

        {recentRequests.length > 0 ? (
          <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
            <table className="table w-full">
              <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                <tr>
                  <th className="rounded-none">Recipient</th>
                  <th>Location</th>
                  <th>Date & Time</th>
                  <th>Blood Group</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentRequests.map((req) => (
                  <tr
                    key={req._id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="font-bold text-gray-700">
                      {req.recipientName}
                    </td>
                    <td className="text-sm text-gray-500">
                      {req.upzila}, {req.districtName}
                    </td>
                    <td className="text-sm text-gray-600">
                      <div className="font-medium">{req.donationDate}</div>
                      <div className="text-xs opacity-60 uppercase">
                        {req.donationTime}
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-error badge-outline font-bold px-3 py-1">
                        {req.bloodGroup}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge badge-sm px-3 py-2 capitalize font-medium ${
                          req.donationStatus === "inprogress"
                            ? "badge-info text-white"
                            : req.donationStatus === "done"
                            ? "badge-success text-white"
                            : "badge-ghost"
                        }`}
                      >
                        {req.donationStatus}
                      </span>
                    </td>
                    <td className="flex gap-2">
                      <div className="dropdown dropdown-left dropdown-end">
                        <label
                          tabIndex={0}
                          className="btn btn-xs btn-outline border-gray-300"
                        >
                          Manage
                        </label>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40 border border-gray-100"
                        >
                          <li>
                            <button
                              onClick={() =>
                                navigate(`/donation-request/${req._id}`)
                              }
                              className="text-xs"
                            >
                              View Details
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() =>
                                navigate(`/dashboard/edit-request/${req._id}`)
                              }
                              className="text-xs text-orange-600"
                            >
                              Edit Request
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => handleDelete(req._id)}
                              className="text-xs text-red-600"
                            >
                              Delete
                            </button>
                          </li>
                          {req.donationStatus === "inprogress" && (
                            <>
                              <div className="divider my-0"></div>
                              <li>
                                <button
                                  onClick={() =>
                                    handleStatusUpdate(req._id, "done")
                                  }
                                  className="text-xs text-green-600 font-bold"
                                >
                                  Mark Done
                                </button>
                              </li>
                              <li>
                                <button
                                  onClick={() =>
                                    handleStatusUpdate(req._id, "canceled")
                                  }
                                  className="text-xs text-gray-400"
                                >
                                  Cancel
                                </button>
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <div className="text-4xl mb-4">🩸</div>
            <h4 className="text-lg font-semibold text-gray-600">
              No recent requests found
            </h4>
            <p className="text-gray-400 mb-6">
              You haven't posted any blood donation requests recently.
            </p>
            <button
              onClick={() => navigate("/dashboard/create-request")}
              className="btn btn-primary btn-sm"
            >
              Create New Request
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default DonorHome;
