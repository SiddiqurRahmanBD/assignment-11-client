import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { HiDotsVertical } from "react-icons/hi";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");
  const axiosSecure = useAxiosSecure();

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await axiosSecure.get("/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [axiosSecure]);

  // Block / Unblock
  const handleStatus = async (email, status) => {
    try {
      await axiosSecure.patch(
        `/update/user/status?email=${email}&status=${status}`
      );
      fetchUsers();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };
  
  const handleRole = async (email, role) => {
    try {
      await axiosSecure.patch(`/update/user/role?email=${email}&role=${role}`);
      fetchUsers();
    } catch (error) {
      console.error("Failed to update role:", error);
    }
  };

  // Filter users by status
  const filteredUsers =
    filter === "all" ? users : users.filter((user) => user.status === filter);

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          All Users ({filteredUsers.length})
        </h2>

        {/* Status Filter */}
        <select
          className="select select-bordered select-sm"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="Active">Active</option>
          <option value="Blocked">Blocked</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Serial</th>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user?._id}>
                <th>{index + 1}</th>

                {/* User info */}
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={user?.photoURL} alt="User" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user?.name}</div>
                      <div className="text-sm opacity-50">{user?.email}</div>
                    </div>
                  </div>
                </td>

                {/* Role */}
                <td className="capitalize">{user?.role}</td>

                {/* Status */}
                <td
                  className={`font-bold ${
                    user?.status === "Active" ? "text-success" : "text-error"
                  }`}
                >
                  {user?.status}
                </td>

                {/* Actions */}
                <td>
                  <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-sm">
                      <HiDotsVertical size={18} />
                    </label>

                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      {/* Block / Unblock */}
                      {user?.status === "Active" ? (
                        <li>
                          <button
                            onClick={() => handleStatus(user.email, "Blocked")}
                            className="text-error"
                          >
                            Block
                          </button>
                        </li>
                      ) : (
                        <li>
                          <button
                            onClick={() => handleStatus(user.email, "Active")}
                            className="text-success"
                          >
                            Unblock
                          </button>
                        </li>
                      )}

                      {/* Make Volunteer */}
                      {user?.role === "Donor" ? (
                        <li>
                          <button
                            onClick={() => handleRole(user.email, "Volunteer")}
                          >
                            Volunteer
                          </button>
                        </li>) :(<li>
                          <button
                            onClick={() => handleRole(user.email, "Donor")}
                            className="font-semibold"
                          >
                           Donor
                          </button>
                        </li>)}

                      {/* Make Admin */}
                      {/* {user?.role === "Volunteer" && (
                        // <li>
                        //   <button
                        //     onClick={() => handleRole(user.email, "Volunteer")}
                        //     className="font-semibold"
                        //   >
                        //    Volunteer
                        //   </button>
                        // </li>
                      )} */}
                    </ul>
                  </div>
                </td>
              </tr>
            ))}

            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
