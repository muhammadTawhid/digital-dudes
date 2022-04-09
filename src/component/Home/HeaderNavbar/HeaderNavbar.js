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


const HeaderNavbar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [isSticky, setSticky] = useState(false);
    console.log(loggedInUser)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                setSticky(true);
            } else {
                setSticky(false);
            }
        });
    }, []);

    const handleLogOut = () => {
        setLoggedInUser("");
    }

    return (
        <Jump top>
            <Navbar className="navbar" expand="lg">
                <Container>
                    <Navbar.Brand><Link to="/"><img style={{ width: "100px" }} src={logo} alt="" /></Link></Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav"> <FontAwesomeIcon id="menuBar" icon={faBars} /><FontAwesomeIcon id="crossMark" icon={faTimes} /></Navbar.Toggle>
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
                                    <NavDropdown.Item><button onClick={handleLogOut} className="log-out">Log out</button></NavDropdown.Item>
                                </NavDropdown>
                                :
                                <Nav.Link><Link to="/login">login</Link></Nav.Link>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <button className={isSticky ? "scroll-top-btn" : "scroll-top-btn-hide"}><LinkScroll to="home" spy={true} smooth={true} duration={1000} className="text-reset"><FontAwesomeIcon icon={faLongArrowAltUp} />
            </LinkScroll></button>
        </Jump>
    );
};

export default HeaderNavbar;
