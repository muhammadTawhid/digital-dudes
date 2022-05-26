import './Sidebar.css';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../images/logo.png';
import { SidebarAdminData } from '../SidebarAdminData/SidebarAdminData';
import { SidebarUserData } from '../SidebarUserData/SidebarUserData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars, faArrowLeft, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../../App';
import useWindowDimensions from '../../Hooks/useWindowDimensions';

const Sidebar = () => {
  const { width } = useWindowDimensions();
  const [loggedInUser, setLoggedInUser, sidebar, setSidebar] = useContext(UserContext);

  useEffect(() => {
    document.title = "Dashboard"
  }, []);


  const showSidebar = () => {
    setSidebar(!sidebar)
  };

  const sidebarDisable = () => {
    if (width <= 575) {
      setSidebar(false);
    }
    else {
      setSidebar(true);
    }
  }

  return (
    <div>
      <div className="sidebar">
        <div className={sidebar ? "menu clicked" : "menu"} onClick={showSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div>
          <img
            id="sidebar-header-avatar"
            src={loggedInUser.imgUrl}
            alt=""
          />
        </div>
      </div>
      <div className={sidebar ? "sidebar-menu sidebar-active" : "sidebar-menu"}>
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
            <div>
              <FontAwesomeIcon icon={faTimes} onClick={showSidebar} id="xMark-icon" />
            </div>
            <Link to="#" className={sidebar ? "menu-bars" : "menu-bars left-arrow-icon"} onClick={showSidebar}>
              <FontAwesomeIcon id="left-arrow" icon={faArrowLeft} />
            </Link>
          </li>
          {
            loggedInUser.admin ?
              SidebarAdminData.map((item, index) => {
                return (
                    <li key={index} className={item.cName} onClick={sidebarDisable}>
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
                  <li key={index} className={item.cName} onClick={sidebarDisable}>
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
    </div>
  );
};

export default Sidebar;

