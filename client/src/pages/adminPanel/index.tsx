import { useEffect, useState } from "react";
import "./index.scss";
import AdminLogin from "../../components/adminLogin";
import AdminCars from "../../components/adminCars";
import AdminCategories from "../../components/adminCategories";
import AdminTeams from "../../components/adminTeams";
import AdminDrivers from "../../components/adminDrivers";
import AdminCoDrivers from "../../components/adminCoDrivers";
import AdminRallies from "../../components/adminRallies";
import AdminNews from "../../components/adminNews";

type AdminDetails = {
  id: Number;
  username: string;
  password: string;
};

function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [adminDetails, setAdminDetails] = useState<AdminDetails | null>(null);
  const [activeTab, setActiveTab] = useState<string>('');

  useEffect(() => {
    document.title = 'RallySphere - Admin Panel';
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    const storedAdminDetails = localStorage.getItem('adminDetails');
    if (storedAdminDetails) {
      setIsLoggedIn(true);
      setAdminDetails(JSON.parse(storedAdminDetails));
    } else {
      setIsLoggedIn(loggedInStatus === 'true');
    }
  }, []);

  const handleLoginSuccess = (admin: AdminDetails) => {
    localStorage.setItem('adminDetails', JSON.stringify(admin));
    setAdminDetails(admin);
    setIsLoggedIn(true);
  };

  const handleLoginError = (error: string) => {
    alert(error);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminDetails');
    setAdminDetails(null);
    setIsLoggedIn(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'cars':
        return <AdminCars/>;
      case 'categories':
        return <AdminCategories/>;
      case 'teams':
        return <AdminTeams/>;
      case 'drivers':
        return <AdminDrivers/>;
      case 'codrivers':
        return <AdminCoDrivers/>;
      case 'rallies':
        return <AdminRallies/>;
      case 'news':
        return <AdminNews/>;
      default:
        return <AdminCars/>;
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <div className="wrapper1">
          <div className="login-status">
            <div>
              <p>Logged in as {adminDetails?.username}</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
          <div className="adminNav">
            <button onClick={() => setActiveTab('cars')}>Cars</button>
            <button onClick={() => setActiveTab('categories')}>Groups</button>
            <button onClick={() => setActiveTab('teams')}>WRC Teams</button>
            <button onClick={() => setActiveTab('drivers')}>WRC Drivers</button>
            <button onClick={() => setActiveTab('codrivers')}>WRC Co-Drivers</button>
            <button onClick={() => setActiveTab('rallies')}>WRC Rallies</button>
            <button onClick={() => setActiveTab('news')}>News</button>
          </div>
          {renderContent()}
        </div>
      ) : (
        <AdminLogin
          onLoginSuccess={handleLoginSuccess}
          onLoginError={handleLoginError}
        />
      )}
    </>
  );
}

export default AdminPanel;