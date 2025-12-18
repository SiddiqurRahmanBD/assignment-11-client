import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthContext';
import ManagementHome from '../../Components/ManagementHome/ManagementHome';
import DonorHome from '../../Components/DonorHome/DonorHome';

const Dashboard = () => {
      const { role } = useContext(AuthContext);
      if (role === "Admin" || role ==="Volunteer") {
        return <ManagementHome/>
      }
    return (
        <div>
            <DonorHome/>
        </div>
    );
};

export default Dashboard;
