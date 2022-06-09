import './HeaderNavbar.css'
import React, { useState, useEffect, useContext } from 'react';
import logo from '../../../images/logo.png'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import { Link as LinkScroll } from "react-scroll";
import Jump from 'react-reveal/Reveal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltUp, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import useWindowDimensions from '../../Hooks/useWindowDimensions';


const HeaderNavbar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { width } = useWindowDimensions();
    const [isSticky, setSticky] = useState(false);
    const [isNavbarActive, setIsNavbarActive] = useState(false)
    const localStorageItems = ["newLoggedInUser", "loggedInUserToken"];

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                setSticky(true);
            } else {
                setSticky(false);
            }
        });
    }, []);

    useEffect(() => {
        if (992 <= width) {
            setIsNavbarActive(false);
        }
    }, [])

    const handleLogOut = () => {
        setLoggedInUser("");
        localStorageItems.forEach(items => localStorage.removeItem(items))
    }


    return (
        <Jump top>
            <Navbar id="home" className={`navbar ${isNavbarActive && "navbarActive"}`} expand="lg">
                <Container>
                    <Navbar.Brand><Link to="/"><img style={{ width: "100px" }} src={logo} alt="" /></Link></Navbar.Brand>

                    <Navbar.Toggle onClick={() => setIsNavbarActive(!isNavbarActive)} aria-controls="basic-navbar-nav"> <FontAwesomeIcon id="menuBar" icon={faBars} /><FontAwesomeIcon id="crossMark" icon={faTimes} /></Navbar.Toggle>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto text-white">
                            <Nav.Link ><Link to="/">Home</Link></Nav.Link>
                            <Nav.Link ><Link to={`/dashboard/${loggedInUser.admin ? "manageService" : "subscription"}`}>Dashboard</Link></Nav.Link>
                            <Nav.Link ><LinkScroll to="pricing" spy={true} smooth={true} duration={800}>Pricing</LinkScroll></Nav.Link>
                            <Nav.Link ><LinkScroll to="aboutUs" spy={true} smooth={true} duration={800}>About us</LinkScroll></Nav.Link>
                            {loggedInUser.email ?
                                <NavDropdown title={
                                    <div className="pull-left">
                                        <img className="icon-image"
                                            src={loggedInUser.imgUrl}
                                            alt=""
                                        />
                                    </div>
                                } id="basic-nav-dropdown">
                                    <p className="text-center"><b>{loggedInUser.name}</b></p>
                                    <NavDropdown.Item>
                                        <button onClick={handleLogOut} className="log-out">Log out</button>
                                    </NavDropdown.Item>
                                </NavDropdown>
                                :
                                <Nav.Link><Link to="/login">login</Link></Nav.Link>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className={isSticky ? "scroll-top-btn-div" : "scroll-top-btn-div-hide"}>
                <LinkScroll to="home" spy={true} smooth={true} duration={1000} >
                    <button className="scroll-top-btn">
                        <FontAwesomeIcon icon={faLongArrowAltUp} />
                    </button>
                </LinkScroll>
            </div>
        </Jump>
    );
};

export default HeaderNavbar;
