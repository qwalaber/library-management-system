import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';

import { AuthContext } from "../contexts/AuthContext";

const HomePage = () => {

    const navigate = useNavigate();
    
    const { role } = useContext(AuthContext);
    const menuItems = ["Borrow", "Browse", "Manage"];

    const handleNavigation = inputText => {
        switch(inputText){
            case "Borrow":
                if(role==="User") navigate('/books');
                else navigate('/login');
                break;
            case "Browse":
                navigate('/books');
                break;
            case "Manage":
                if(role==="Librarian") navigate('/manage');
                else if(role==="User") navigate('/profile');
                else navigate('/login');
                break;
            default: 
                break;
        }
    }

    return(<>
    <div className="container">
        <div className="row py-5 my-4 my-sm-5">
            <h2 className="site-heading">Pages of Wisdom,<br/>
                Infinite Journeys.</h2>
        </div>
    </div>
    <div className="banner-image-wrapper">
        <img className="banner-image" src="/images/homepage-banner.jpg" alt="Photo by Ryunosuke Kikuno Unsplash" />
    </div>
    <div className="container pt-sm-3 pb-sm-3">
        <div className="row py-4 mt-2 mt-sm-4 pt-sm-5">
            {menuItems.map(menuItem => 
                <div className="description col-sm-4 d-flex flex-column align-items-center">
                    <img src={`images/homepage-${menuItem}.svg`} className="mt-4 mt-sm-0 mb-sm-3 description-image" alt="Bibliophile Image" onClick={()=>handleNavigation(`${menuItem}`)}/>
                    <h6 className="mt-4 mb-5 description-text">{menuItem}</h6>
                </div>
            )}
        </div>
    </div></>)
}

export default HomePage;