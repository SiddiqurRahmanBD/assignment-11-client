import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthContext";

const MyDonationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [totalRequests, setTotalRequests] = useState(0);
  const [itemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { role } = useContext(AuthContext);

  const fetchRequests = () => {
    axiosSecure
      .get(`/all-requests?page=${currentPage - 1}&size=${itemsPerPage}`)
      .then((res) => {
        setRequests(res.data.request);
        setTotalRequests(res.data.totalRequest);
      });
  };

  useEffect(() => {
    fetchRequests();
  }, [currentPage, itemsPerPage]);

  const handleStatusUpdate = async (id, status) => {
    const res = await axiosSecure.patch(`/donation-request/${id}`, { status });
    if (res.data.modifiedCount > 0) {
      fetchRequests();
      Swal.fire("Updated!", `Status is now ${status}`, "success");
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/donation-request/${id}`);
        if (res.data.deletedCount > 0) {
          fetchRequests();
          Swal.fire("Deleted!", "Request has been removed.", "success");
        }
      }
    });
  };

  const totalPages = Math.ceil(totalRequests / itemsPerPage);
  const pages = [...Array(totalPages).keys()].map((i) => i + 1);

  return (
    <div className="p-6 bg-base-100 rounded-xl shadow-sm border border-base-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          All Donation Requests
        </h2>
        <div className="badge badge-primary p-4 gap-2">
          Total: {totalRequests}
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-base-200">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th>#</th>
              <th>Recipient</th>
              <th>Location</th>
              <th>Date & Time</th>
              <th>Blood</th>
              <th>Status</th>
              <th>Donor</th>
              {
                role ==="Admin" && <th className="text-center">Actions</th>
              }
              
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr key={request._id} className="hover">
                <td className="font-semibold">
                  {(currentPage - 1) * itemsPerPage + (index + 1)}
                </td>
                <td>
                  <div className="font-bold">{request.recipientName}</div>
                </td>
                <td className="text-xs">
                  {request.upzila}, {request.districtName}
                </td>
                <td>
                  <div className="text-sm">{request.donationDate}</div>
                  <div className="opacity-50 text-xs">
                    {request.donationTime}
                  </div>
                </td>
                <td>
                  <span className="badge badge-outline badge-error font-bold">
                    {request.bloodGroup}
                  </span>
                </td>
                <td>
                  <span
                    className={`badge badge-sm capitalize ${
                      request.donationStatus === "pending"
                        ? "badge-warning"
                        : request.donationStatus === "inprogress"
                        ? "badge-info"
                        : request.donationStatus === "done"
                        ? "badge-success text-white"
                        : "badge-ghost"
                    }`}
                  >
                    {request.donationStatus}
                  </span>
                </td>
                <td>
                  {request.donationStatus === "inprogress" ? (
                    <div className="text-xs">
                      <p className="font-bold">{request.donorName}</p>
                      <p className="opacity-60">{request.donorEmail}</p>
                    </div>
                  ) : (
                    "---"
                  )}
                </td>
                {
                  role === "Admin" &&  <td className="flex justify-center gap-1">
                  <button
                    onClick={() => navigate(`/donation-request/${request._id}`)}
                    className="btn btn-square btn-ghost btn-xs tooltip"
                    data-tip="View"
                  >
                    👁️
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/dashboard/edit-request/${request._id}`)
                    }
                    className="btn btn-square btn-outline btn-warning btn-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(request._id)}
                    className="btn btn-square btn-outline btn-error btn-xs"
                  >
                    Del
                  </button>

                  {request.donationStatus === "inprogress" && (
                    <div className="join ml-2">
                      <button
                        onClick={() => handleStatusUpdate(request._id, "done")}
                        className="btn btn-xs btn-success text-white join-item"
                      >
                        Done
                      </button>
                      <button
                        onClick={() =>
                          handleStatusUpdate(request._id, "canceled")
                        }
                        className="btn btn-xs btn-secondary join-item"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </td>
                }

               
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center mt-8 gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="btn btn-sm btn-outline"
        >
          «
        </button>

        {pages.map((p) => (
          <button
            key={p}
            onClick={() => setCurrentPage(p)}
            className={`btn btn-sm ${
              p === currentPage ? "btn-primary" : "btn-ghost"
            }`}
          >
            {p}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="btn btn-sm btn-outline"
        >
          »
        </button>
      </div>
    </div>
  );
};

export default MyDonationRequests;
