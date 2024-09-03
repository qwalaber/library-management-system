import React, { useRef, useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import './../App.scss';

import { AuthContext } from "../assets/contexts/AuthContext";

const NavBar = () => {

    const { authUser, logout } = useContext(AuthContext);

    const tooltipRef = useRef(null);

    const [ isMobNavOpen, setIsMobNavOpen ] = useState(false);

    const logoNav = () => {
        return <NavLink className={`logo nav-item d-flex ${ isMobNavOpen ? `hide-item` : `show-item`} des-item`} to="/" onClick={()=>setIsMobNavOpen(!isMobNavOpen)}>
            <span className="org-name ms-2 me-1">Liby</span>
            <i className="fa fa-book my-auto me-1" aria-hidden="true"></i>
        </NavLink>
    }

    const homeNav = () => {
        return <NavLink className={`nav-item pe-sm-4 ${isMobNavOpen ? `show-item` : `hide-item`} des-item`} to="/" onClick={()=>setIsMobNavOpen(!isMobNavOpen)} active="true">Home</NavLink>
    }

    const booksNav = () => {
        return <NavLink className={`nav-item pe-sm-4 ${isMobNavOpen ? `show-item` : `hide-item`} des-item`} to="/books" onClick={()=>setIsMobNavOpen(!isMobNavOpen)}>Books</NavLink>
    }

    const profileNav = () => {
        return <NavLink className={`nav-item ${isMobNavOpen ? `show-item` : `hide-item`} des-item`} to="/profile" onClick={()=>setIsMobNavOpen(!isMobNavOpen)}>Profile</NavLink>
    }

    const manageNav = () => {
        return <NavLink className={`nav-item ${isMobNavOpen ? `show-item` : `hide-item`} des-item`} to="/manage" onClick={()=>setIsMobNavOpen(!isMobNavOpen)}>Manage</NavLink>
    }

    const userLogo = () => {
        return <span className="profile-buffer nav-item hide-item ${isMobNavOpen ? `show-item` : `hide-item`} des-item text-muted" data-tooltip-id="logout-tooltip">
        {authUser.email} <i className="fa fa-user" aria-hidden="true"></i>
    </span> 
    }

    const userEmailMobile = () => {
        return <span className={`nav-item ${isMobNavOpen ? `show-item` : `hide-item`}`} data-tooltip-id="logout-tooltip"></span>
    }

    const librarianLogo = () => {
        return <span className="profile-buffer nav-item hide-item des-item text-muted" data-tooltip-id="logout-tooltip">
        {authUser.email} <i className="fa fa-lock" aria-hidden="true"></i>
    </span> 
    }

    const loginNav = () => {
        return <NavLink className={`profile-buffer nav-item`} to="/login" onClick={()=>setIsMobNavOpen(!isMobNavOpen)}>
                <span className={`${isMobNavOpen ? `show-item` : `hide-item`} mob-maxi-nav-item`}>Log In
                </span>
               <span className="hide-item des-item">
                   <i className="fa fa-sign-in" aria-hidden="true"></i>
               </span>
            </NavLink>
    }

    return(<nav className={`liby-nav navbar navbar-expand-sm justify-content-center text-center d-flex ${isMobNavOpen ? `` : `toggle-mob-nav-height`}`} ref={tooltipRef}>
        <ul className="navbar-nav">
            {logoNav()} {homeNav()} {booksNav()}
            {authUser ? 
            authUser.role === "user" ? <>{profileNav()} {userLogo()} {userEmailMobile()}</> 
                :<>{manageNav()} {librarianLogo()} {userEmailMobile()}</> 
                : loginNav()}
            <Tooltip id="logout-tooltip" openEvents={{ click: true }} closeEvents={{ click: true }} globalCloseEvents={{ clickOutsideAnchor: true }} clickable={true} className="bg-light text-dark border border-2 hover-pointer arrow">
                <div onClick={()=>logout()}>Logout</div>
            </Tooltip>
        </ul>
    </nav>)
}

export default NavBar;