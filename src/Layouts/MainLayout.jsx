
import { Outlet } from 'react-router';

import { ToastContainer } from 'react-toastify';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';

const MainLayout = () => {
    return (
      <div>
        <Navbar></Navbar>

        <div className="pt-24 min-h-[calc(100vh-68px)]">
          <Outlet></Outlet>
        </div>

        <Footer></Footer>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    );
};

export default MainLayout;