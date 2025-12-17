import React, { useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthContext';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() =>{
        axiosSecure.get('/users')
        .then(res=> {
            setUsers(res.data)
        })
    },[axiosSecure])

    console.log(users);
    return (
      <div>
        <h2>All Users{users.length} </h2>

        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Serial</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {users.map((user, index) => (
                <tr>
                  <th>{index + 1} </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={user?.photoURL}
                            alt="Users Image"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user?.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{user?.email} </td>
                  <td>{user?.role}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">{user?.status}</button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default AllUsers;