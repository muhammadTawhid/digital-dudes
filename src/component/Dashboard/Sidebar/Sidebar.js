import './Sidebar.css';
import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faArrowRight, faArrowLeft, faSignOutAlt, faTasks, faFolderPlus, faMoneyCheckAlt, faFileInvoiceDollar, faUserPlus, faHouseUser } from '@fortawesome/free-solid-svg-icons';
import logo from '../../../images/logo.png';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';


const Sidebar = () => {
  const [sidebar, setSidebar] = useState(true);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  console.log(sidebar,"sidebar");
  useEffect(() => {
    document.title = "Dashboard"
  }, []);

  const handleLogOut = () => {
    setLoggedInUser("")
  }
  return (
    <div>
      <div className={sidebar ? "sidebar-on" : " sidebar-off"}>
        <div className="sidebar-header">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
          <button onClick={() => setSidebar(!sidebar)}>{sidebar ? <FontAwesomeIcon icon={faArrowLeft} /> : <FontAwesomeIcon icon={faArrowRight} />}</button>
        </div>

        <div className="sidebar-content">
          {loggedInUser.admin && <div>
            <div className="">
              <Link to="/dashboard/manageService">
                <button className="d-flex justify-content-around"><span><FontAwesomeIcon icon={faTasks} /></span> <span>Manage Service</span></button>
              </Link>
            </div>
            <div className="">
              <Link to="/dashboard/addService">
                <button className="d-flex justify-content-around"><span><FontAwesomeIcon icon={faFolderPlus} /></span> <span>Add Service</span></button>
              </Link>
            </div>
            <div className="">
              <Link to="/dashboard/editPricing">
                <button className="d-flex justify-content-around"><span><FontAwesomeIcon icon={faFileInvoiceDollar} /></span><span>Edit Pricing</span></button>
              </Link>
            </div>
            <div className="">
              <Link to="/dashboard/addAdmin">
                <button className="d-flex justify-content-around"><span><FontAwesomeIcon icon={faUserPlus} /></span><span>Add Admin</span></button>
              </Link>
            </div>
          </div>}
          <div>
            <Link to="/dashboard/subscription">
              <button className="d-flex justify-content-around"><span><FontAwesomeIcon icon={faMoneyCheckAlt} /></span> <span>{loggedInUser.admin ? "Subscripted User" : "Your Subscription"}</span></button>
            </Link>
          </div>
          <div>
            <Link to="/dashboard/addReview">
              <button className="d-flex justify-content-around"><span><FontAwesomeIcon icon={faStar} /></span> <span>Add Review</span></button>
            </Link>
          </div>
          <div>
            <Link to="/">
              <button className="d-flex justify-content-around"><span><FontAwesomeIcon icon={faHouseUser} /></span> <span>Back to home</span></button>
            </Link>
          </div>

        </div>

        <div className="sidebar-footer">
          <button id={loggedInUser.admin ? "" : "nonAdminButton"} onClick={handleLogOut}><FontAwesomeIcon icon={faSignOutAlt} /> Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

