import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';

import { AuthContext } from "../assets/contexts/AuthContext";

const HomePage = () => {

    const { authUser } = useContext(AuthContext);
    const menuItems = ["Borrow", "Browse", "Manage"];
    const navigate = useNavigate();

    const handleRedirect = text => {
        switch(text){
            case "Borrow":
                if(authUser.role==="user") navigate("/books");
                else navigate("/login");
                break;
            case "Browse":
                navigate("/books");
                break;
            case "Manage":
                if(authUser.role==="librarian") navigate("/manage");
                else if(authUser.role==="user") navigate("/profile");
                else navigate("/login");
                break;
            default: 
                break;
        }
    }

    return(<>
    <div className="container">
        <div className="row py-5 my-4 my-sm-5">
            <h2 className="homepage-heading">
                Pages of Wisdom, <br/>
                Infinite Journeys.
            </h2>
        </div>
    </div>
    <div className="homepage-banner">
        <img className="homepage-banner" src="/images/homepage-banner.jpg" alt="Photo by Ryunosuke Kikuno Unsplash" />
    </div>
    <div className="container pt-sm-3 pb-sm-3">
        <div className="row py-4 mt-2 mt-sm-4 pt-sm-5">
            {menuItems.map((menuItem, key) => 
                <div className="col-sm-4 d-flex flex-column align-items-center" key={key}>
                    <img src={`images/homepage-${menuItem}.svg`} className="homepage-menu-image mt-4 mt-sm-0 mb-sm-3" alt="Bibliophile Image" onClick={()=>handleRedirect(`${menuItem}`)}/>
                    <h6 className="mt-4 mb-5 description-text">{menuItem}</h6>
                </div>
            )}
        </div>
    </div></>)
}

export default HomePage;