import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { NavLink } from "react-router-dom";
import './../App.css';

const NavBar = () => {

    const { role, user } = useContext(AuthContext);
    
    const [ isMobNavOpen, setIsMobNavOpen ] = useState(false);

    return(<nav className={`liby-nav navbar navbar-expand-sm justify-content-center text-center d-flex ${isMobNavOpen ? `` : `toggle-mob-nav-height`}`}>
        <ul className="navbar-nav">
            <NavLink className={`logo nav-item d-flex ${ isMobNavOpen ? `hide-item` : `show-item`} des-item`} to="/" onClick={()=>setIsMobNavOpen(!isMobNavOpen)}>
                <span className="org-name ms-2 me-1">Liby</span>
                <i className="fa fa-book my-auto me-1" aria-hidden="true"></i>
            </NavLink>
            <NavLink className={`nav-item pe-sm-4 ${ isMobNavOpen ? `show-item` : `hide-item`} des-item`} to="/" onClick={()=>setIsMobNavOpen(!isMobNavOpen)} active>Home</NavLink>
            <NavLink className={`nav-item pe-sm-4 ${isMobNavOpen ? `show-item` : `hide-item`} des-item`} to="/books" onClick={()=>setIsMobNavOpen(!isMobNavOpen)}>Books</NavLink>
            
            { role === "User" ? <NavLink className={`nav-item ${isMobNavOpen ? `show-item` : `hide-item`} des-item`} to="/history" onClick={()=>setIsMobNavOpen(!isMobNavOpen)}>My Activity</NavLink>
            : null }

            { role === "Librarian" ? 
                <NavLink className={`nav-item ${isMobNavOpen ? `show-item` : `hide-item`} des-item`} to="/users" onClick={()=>setIsMobNavOpen(!isMobNavOpen)}>Manage users</NavLink>
            : null }

            { role === "User" ? <NavLink className={`profile-buffer nav-item`} to="/" disabled>
                <span className="hide-item des-item">
                    {user.email} <i className="fa fa-user" aria-hidden="true"></i>
                </span> 
            </NavLink>

            : role === "Librarian" ? <NavLink className={`profile-buffer nav-item`} to="/" disabled>
                <span className="hide-item des-item">
                    {user.email} <i className="fa fa-lock" aria-hidden="true"></i>
                </span> 
            </NavLink>

            : <NavLink className={`profile-buffer nav-item`} to="/login" onClick={()=>setIsMobNavOpen(!isMobNavOpen)}>
                <span className={`${isMobNavOpen ? `show-item` : `hide-item`} mob-maxi-nav-item`}>Log In
                </span>
               <span className="hide-item des-item">
                   <i className="fa fa-sign-in" aria-hidden="true"></i>
               </span>
            </NavLink>}
        </ul>
    </nav>)
}

export default NavBar;