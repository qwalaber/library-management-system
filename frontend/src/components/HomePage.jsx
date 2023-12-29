import React from "react";

const HomePage = () => {
    return(<>
    <div className="container">
        <div className="row py-5 my-4 my-sm-5">
            <h2 className="site-heading">Pages of Wisdom,<br/>
                Infinite Journeys.</h2>
        </div>
    </div>
    <div className="banner-image-wrapper">
        <img className="banner-image" src="/images/home-banner-image.jpg" alt="Photo by Ryunosuke Kikuno Unsplash" />
    </div>
    <div className="container pt-sm-3 pb-sm-3">
        <div className="row py-4 mt-2 mt-sm-4 pt-sm-5">
            <div className="description col-sm-4 d-flex flex-column align-items-center">
                <img src="images/undraw-bibliophile.svg" className="mt-4 mt-sm-0 mb-sm-3 description-image" alt="Bibliophile Image" />
                <h6 className="mt-4 mb-5 description-text">Borrow</h6>
            </div>
            <div className="description col-sm-4 d-flex flex-column align-items-center">
                <img src="images/undraw-bookshelves.svg" className="mt-2 mt-sm-0 mb-sm-3 description-image" alt="Bookshelves Image" />
                <h6 className="mt-4 mb-5 description-text">Browse</h6>
            </div>
            <div className="description col-sm-4 d-flex flex-column align-items-center">
                <img src="images/undraw-book-lover.svg" className="mt-2 mt-sm-0 mb-sm-3 description-image" alt="Book Lover Image" />
                <h6 className="mt-4 mb-5 pb-1 pb-sm-0 mb-sm-5 description-text">Manage</h6>
            </div>
        </div>
    </div></>)
}

export default HomePage;