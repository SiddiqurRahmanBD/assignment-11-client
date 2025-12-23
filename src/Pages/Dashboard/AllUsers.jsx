import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { HiDotsVertical } from "react-icons/hi";
import {
  Users,
  Filter,
  ShieldCheck,
  ShieldAlert,
  UserCog,
  Ban,
  CheckCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import { AuthContext } from "../../Provider/AuthContext";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");
  const axiosSecure = useAxiosSecure();

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

  const handleStatus = async (email, status) => {
    try {
      await axiosSecure.patch(
        `/update/user/status?email=${email}&status=${status}`
      );
      toast.info(`User is now ${status}`);
      fetchUsers();
    } catch (error) {
      console.log(error);
      toast.error("Status update failed");
    }
  };

  const handleRole = async (email, role) => {
    try {
      await axiosSecure.patch(`/update/user/role?email=${email}&role=${role}`);
      toast.success(`Role updated to ${role}`);
      fetchUsers();
    } catch (error) {
      console.log(error);
      toast.error("Role update failed");
    }
  };

  const filteredUsers =
    filter === "all" ? users : users.filter((u) => u.status === filter);

  return (
    <div className="py-6 animate-in fade-in duration-500">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <Users className="text-red-600" size={32} /> User Directory
            </h2>
            <p className="text-slate-500 mt-2 font-medium">
              Manage permissions and account status for all members.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 px-3 text-slate-400">
              <Filter size={18} />
              <span className="text-sm font-bold">Filter:</span>
            </div>
            <select
              className="bg-slate-50 border-none text-slate-700 font-bold text-sm rounded-xl focus:ring-0 cursor-pointer pr-10 py-2"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Members</option>
              <option value="Active">Active Only</option>
              <option value="Blocked">Blocked Only</option>
            </select>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-xl shadow-slate-200/40 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full border-separate border-spacing-y-0">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="py-6 pl-8 text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] border-none">
                    Member
                  </th>
                  <th className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] border-none">
                    Role
                  </th>
                  <th className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] border-none">
                    Status
                  </th>
                  <th className="pr-8 text-right text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] border-none">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredUsers.map((user) => (
                  <tr
                    key={user?._id}
                    className="hover:bg-slate-50/30 transition-colors group"
                  >
                    <td className="py-5 pl-8">
                      <div className="flex items-center gap-4">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12 ring-2 ring-slate-100">
                            <img
                              src={
                                user?.photoURL ||
                                "https://i.ibb.co/mJR9z8y/user.png"
                              }
                              alt="Avatar"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-black text-slate-800">
                            {user?.name}
                          </div>
                          <div className="text-xs font-bold text-slate-400">
                            {user?.email}
                          </div>
                        </div>
                      </div>
                    </td>
                     <td>
                      <span
                        className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          user?.role === "Admin"
                            ? "bg-purple-50 text-purple-600"
                            : user?.role === "Volunteer"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {user?.role}
                      </span>
                    </td>

                    <td>
                      <div
                        className={`flex items-center gap-1.5 font-bold text-sm ${
                          user?.status === "Active"
                            ? "text-emerald-500"
                            : "text-red-400"
                        }`}
                      >
                        {user?.status === "Active" ? (
                          <ShieldCheck size={16} />
                        ) : (
                          <ShieldAlert size={16} />
                        )}
                        {user?.status}
                      </div>
                    </td>

                    <td className="pr-8 text-right">
                      <div className="dropdown dropdown-left">
                        <label
                          tabIndex={0}
                          className="btn btn-ghost btn-sm btn-circle hover:bg-white hover:shadow-md transition-all"
                        >
                          <HiDotsVertical
                            size={20}
                            className="text-slate-400"
                          />
                        </label>
                        <ul
                          tabIndex={0}
                          className="dropdown-content menu p-3 shadow-2xl bg-white border border-slate-50 rounded-[1.5rem] w-52 z-20"
                        >
                          <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest px-4 py-2">
                            Quick Actions
                          </p>

                          <li>
                            {user?.status === "Active" ? (
                              <button
                                onClick={() =>
                                  handleStatus(user.email, "Blocked")
                                }
                                className="text-red-600 hover:bg-red-50 rounded-xl font-bold flex items-center gap-2"
                              >
                                <Ban size={16} /> Block User
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  handleStatus(user.email, "Active")
                                }
                                className="text-emerald-600 hover:bg-emerald-50 rounded-xl font-bold flex items-center gap-2"
                              >
                                <CheckCircle size={16} /> Unblock User
                              </button>
                            )}
                          </li>

                          <div className="h-px bg-slate-50 my-2" />
                          <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest px-4 py-2">
                            Change Role
                          </p>

                          {user?.role !== "Volunteer" && (
                            <li>
                              <button
                                onClick={() =>
                                  handleRole(user.email, "Volunteer")
                                }
                                className="hover:bg-blue-50 text-blue-600 rounded-xl font-bold"
                              >
                                <UserCog size={16} /> Promote to Volunteer
                              </button>
                            </li>
                          )}

                          {user?.role !== "Donor" && (
                            <li>
                              <button
                                onClick={() => handleRole(user.email, "Donor")}
                                className="hover:bg-slate-100 text-slate-600 rounded-xl font-bold"
                              >
                                <UserCog size={16} /> Demote to Donor
                              </button>
                            </li>
                          )}
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 bg-slate-50/30">
              <Users className="text-slate-200 w-16 h-16 mb-4" />
              <p className="text-slate-400 font-bold">
                No users match your criteria.
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 px-8 flex justify-between items-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Showing {filteredUsers.length} total members
          </p>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
