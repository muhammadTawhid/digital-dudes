import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faSignOutAlt, faMoneyCheckAlt, faHouseUser } from '@fortawesome/free-solid-svg-icons';

export const SidebarUserData = [
    {
        title: "Your Subscription",
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