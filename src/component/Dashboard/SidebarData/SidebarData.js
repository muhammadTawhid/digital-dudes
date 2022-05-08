import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faArrowRight, faArrowLeft, faSignOutAlt, faTasks, faFolderPlus, faMoneyCheckAlt, faFileInvoiceDollar, faUserPlus, faHouseUser } from '@fortawesome/free-solid-svg-icons';

export const SidebarData = [
    {
        title: "Manage Service",
        path: "/dashboard/manageService",
        icon: <FontAwesomeIcon icon={faTasks} />,
        cName: "sidebar-text"
    },
    {
        title: "Add Service",
        path: "/dashboard/service/addService",
        icon: <FontAwesomeIcon icon={faFolderPlus} />,
        cName: "sidebar-text"
    },
    {
        title: "Edit Pricing",
        path: "/dashboard/editPricing",
        icon: <FontAwesomeIcon icon={faFileInvoiceDollar} />,
        cName: "sidebar-text"
    },
    {
        title: "Add Admin",
        path: "/dashboard/addAdmin",
        icon: <FontAwesomeIcon icon={faUserPlus} />,
        cName: "sidebar-text"
    },
    {
        title: "Subscription",
        path: "/dashboard/subscription",
        icon: <FontAwesomeIcon icon={faMoneyCheckAlt} />,
        cName: "sidebar-text"
    },
    {
        title: "Add Review",
        path: "/dashboard/addReview",
        icon: <FontAwesomeIcon icon={faStar} />,
        cName: "sidebar-text"
    },
    {
        title: "Home",
        path: "/",
        icon: <FontAwesomeIcon icon={faHouseUser} />,
        cName: "sidebar-text"
    },
]

// import React from 'react';
// import * as FaIcons from 'react-icons/fa';
// import * as AiIcons from 'react-icons/ai';
// import * as IoIcons from 'react-icons/io';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar, faArrowRight, faArrowLeft, faSignOutAlt, faTasks, faFolderPlus, faMoneyCheckAlt, faFileInvoiceDollar, faUserPlus, faHouseUser } from '@fortawesome/free-solid-svg-icons';

// export const SidebarData = [
//   {
//     title: 'Home',
//     path: '/',
//     icon: <AiIcons.AiFillHome />,
//     cName: 'nav-text'
//   },
//   {
//     title: 'Reports',
//     path: '/reports',
//     icon: <IoIcons.IoIosPaper />,
//     cName: 'nav-text'
//   },
//   {
//     title: 'Products',
//     path: '/products',
//     icon: <FaIcons.FaCartPlus />,
//     cName: 'nav-text'
//   },
//   {
//     title: 'Team',
//     path: '/team',
//     icon: <IoIcons.IoMdPeople />,
//     cName: 'nav-text'
//   },
//   {
//     title: 'Messages',
//     path: '/messages',
//     icon: <FaIcons.FaEnvelopeOpenText />,
//     cName: 'nav-text'
//   },
//   {
//     title: 'Support',
//     path: '/support',
//     icon: <IoIcons.IoMdHelpCircle />,
//     cName: 'nav-text'
//   }
// ];