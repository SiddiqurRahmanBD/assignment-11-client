
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const MainLayout = () => {
    return (
      <div>
        <Navbar></Navbar>
        
        <div className="pt-24 min-h-[calc(100vh-68px)]">
             <Outlet></Outlet>
        </div>
       
      <Footer></Footer>
      </div>
    );
};

export default MainLayout;