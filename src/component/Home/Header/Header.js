import "./Header.css";
import React from 'react';
import HeaderNavbar from '../HeaderNavbar/HeaderNavbar';
import HeaderMain from "../HeaderMain/HeaderMain";
import HeaderBottom from "../HeaderBottom/HeaderBottom";

const Header = () => {
    return (
        // <div>
        //     <div className="header-bg">
        //         <HeaderNavbar />
        //         <div>
        //             <HeaderMain />
        //         </div>
        //     </div>
        //     <HeaderBottom />
        // </div>
        <div>
            <div className="header-bg">
                <HeaderNavbar />
                <HeaderMain />
            </div>
                <HeaderBottom />
        </div>
    );
};

export default Header;