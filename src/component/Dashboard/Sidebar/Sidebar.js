import './Sidebar.css';
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../images/logo.png';
import { SidebarAdminData } from '../SidebarAdminData/SidebarAdminData';
import { SidebarUserData } from '../SidebarUserData/SidebarUserData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../../App';

const Sidebar = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [sidebar, setSidebar] = useState(true);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <div className="sidebar">
        <Link to="#" className="menu-bars">
          <FontAwesomeIcon icon={faArrowRight} onClick={showSidebar} />
        </Link>
      </div>
      <div className={sidebar ? "sidebar-menu active" : "sidebar-menu"}>
        <ul className="sidebar-menu-items">
          <li className="sidebar-toggle">
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
            <div>
              <img id="sidebar-avatar"
                src={loggedInUser.imgUrl}
                alt=""
              />
            </div>
            <Link to="#" className="menu-bars">
              <FontAwesomeIcon icon={faArrowLeft} onClick={showSidebar} />
            </Link>
          </li>
          {
            loggedInUser.admin ?
              SidebarAdminData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span className="sidebar-title">{item.title}</span>
                    </Link>
                  </li>
                )
              })
              :
              SidebarUserData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span className="sidebar-title">{item.title}</span>
                    </Link>
                  </li>
                )
              })
          }
          <li className="sidebar-text">
            <button onClick={() => setLoggedInUser("")}>
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span className="sidebar-title">Log Out</span>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;




// import './Sidebar.css';
// import React, { useState, useEffect, useContext } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar, faArrowRight, faArrowLeft, faSignOutAlt, faTasks, faFolderPlus, faMoneyCheckAlt, faFileInvoiceDollar, faUserPlus, faHouseUser } from '@fortawesome/free-solid-svg-icons';
// import logo from '../../../images/logo.png';
// import { Link } from 'react-router-dom';
// import { UserContext } from '../../../App';


// const Sidebar = () => {
//   const [sidebar, setSidebar] = useState(true);
//   const [loggedInUser, setLoggedInUser] = useContext(UserContext)
//   console.log(sidebar, "sidebar");
//   useEffect(() => {
//     document.title = "Dashboard"
//   }, []);

//   const handleLogOut = () => {
//     setLoggedInUser("")
//   }
//   return (

//       <div className={sidebar ? "sidebar-on" : " sidebar-off"}>
//         <div className="sidebar-header">
//           <Link to="/">
//             <img src={logo} alt="" />
//           </Link>
//           <button onClick={() => setSidebar(!sidebar)}>{sidebar ? <FontAwesomeIcon icon={faArrowLeft} /> : <FontAwesomeIcon icon={faArrowRight} />}</button>
//         </div>

//         <div className="sidebar-content">
//           {loggedInUser.admin && <div>
//             <div className="">
//               <Link to="/dashboard/manageService">
//                 <button className="d-flex justify-content-around"><span><FontAwesomeIcon icon={faTasks} /></span> <span>Manage Service</span></button>
//               </Link>
//             </div>
//             <div className="">
//               <Link to="/dashboard/service/addService">
//                 <button className="d-flex justify-content-around"><span><FontAwesomeIcon icon={faFolderPlus} /></span> <span>Add Service</span></button>
//               </Link>
//             </div>
//             <div className="">
//               <Link to="/dashboard/editPricing">
//                 <button className="d-flex justify-content-around"><span><FontAwesomeIcon icon={faFileInvoiceDollar} /></span><span>Edit Pricing</span></button>
//               </Link>
//             </div>
//             <div className="">
//               <Link to="/dashboard/addAdmin">
//                 <button className="d-flex justify-content-around"><span><FontAwesomeIcon icon={faUserPlus} /></span><span>Add Admin</span></button>
//               </Link>
//             </div>
//           </div>}
//           <div>
//             <Link to="/dashboard/subscription">
//               <button className="d-flex justify-content-around"><span><FontAwesomeIcon icon={faMoneyCheckAlt} /></span> <span>{loggedInUser.admin ? "Subscripted User" : "Your Subscription"}</span></button>
//             </Link>
//           </div>
//           <div>
//             <Link to="/dashboard/addReview">
//               <button className="d-flex justify-content-around"><span><FontAwesomeIcon icon={faStar} /></span> <span>Add Review</span></button>
//             </Link>
//           </div>
//           <div>
//             <Link to="/">
//               <button className="d-flex justify-content-around"><span><FontAwesomeIcon icon={faHouseUser} /></span> <span>Back to home</span></button>
//             </Link>
//           </div>

//         </div>

//         <div className="sidebar-footer">
//           <button id={loggedInUser.admin ? "" : "nonAdminButton"} onClick={handleLogOut}><FontAwesomeIcon icon={faSignOutAlt} /> Log Out</button>
//         </div>
//       </div>

//   );
// };

// export default Sidebar;

