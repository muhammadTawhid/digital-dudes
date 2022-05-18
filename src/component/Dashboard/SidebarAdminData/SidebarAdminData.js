import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faSignOutAlt, faTasks, faFolderPlus, faMoneyCheckAlt, faFileInvoiceDollar, faUserPlus, faHouseUser } from '@fortawesome/free-solid-svg-icons';

export const SidebarAdminData = [
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
        title: "Subscripted User",
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
        title: "Back to home",
        path: "/",
        icon: <FontAwesomeIcon icon={faHouseUser} />,
        cName: "sidebar-text"
    },
    // {
    //     title: "Log out",
    //     path: "/",
    //     icon: <FontAwesomeIcon icon={faSignOutAlt} />,
    //     cName: "sidebar-text"
    // },
]
