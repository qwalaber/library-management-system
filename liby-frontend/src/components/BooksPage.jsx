import React, { useContext, useState, useEffect, useRef } from "react";
import { Tooltip } from "react-tooltip";
import axios from "axios";

import { AuthContext } from "../contexts/AuthContext";
import BookCreateModal from "./modals/BookCreateModal";
import BookUpdateModal from "./modals/BookUpdateModal";

const endpoint = 'http://localhost:8080';

const BooksPage = () => {

    const tooltipRef = useRef(null);

    const { role, user } = useContext(AuthContext);

    const [ books, setBooks ] = useState([]);
    const [ searchKeyword, setSearchKeyword ] = useState(""); 
    const [ isCreateBook,  setIsCreateBook ] = useState(false);
    const [ selectedBook, setSelectedBook ] = useState({});
    const [ isUpdateBook, setIsUpdateBook ] = useState(false);
    const [ genreList , getGenreList ] = useState([]);
    const [ subjects , setSubjects ] = useState([]);
    const [ filterMenu, setFilterMenu ] = useState("");
    const [ sortOn, setSortOn ] = useState("Relevance");

    const toggleFilterMenu = (type) => {
        if(filterMenu === "" || filterMenu !== type) setFilterMenu(type);
        else if(filterMenu === type) setFilterMenu("");
    }

    const toggleSort = (heading) => {
        if(sortOn === "" || sortOn !== heading) setSortOn(heading);
        else if(sortOn === heading) setSortOn("Relevance");
    }

    const handleReservation = bookId => {
        const reservation = {
            bookId: bookId,
            userEmail: user.email
        }
        axios.post(`${endpoint}/reservations`, reservation)
            .then(()=>{
                axios.get(`${endpoint}/books`)
                    .then(res => setBooks(res.data)) 
                    .catch(err => {
                    console.error('Error fetching books after new reservation:', err);
                })
            }) 
            .catch(err => {
                console.error('Error creating reservation:', err);
        });
    }

    const handleBorrow = bookId => {
        const borrow = {
            bookId: bookId,
            userEmail: user.email
        }
        axios.post(`${endpoint}/borrows`, borrow)
            .then(()=>{
                axios.get(`${endpoint}/books`)
                    .then(res => setBooks(res.data)) 
                    .catch(err => {
                    console.error('Error fetching books after new borrow:', err);
                })
            }) 
            .catch(err => {
                console.error('Error creating borrow:', err);
        });
    }

    const handleShowBookModal = book => {
        if(role==="Librarian"){
            setSelectedBook(book);
            setIsUpdateBook(true);
        }
    }

    useEffect(()=>{
        axios.get(`${endpoint}/books/subjects`)
            .then(res => setSubjects(res.data)) 
            .catch(err => {
                console.error('Error fetching subjects:', err);
        });
    },[])

    useEffect(()=>{
        setFilterMenu("");
    },[sortOn])

    useEffect(()=>{
        if(!isUpdateBook && !isCreateBook) axios({
            method: "get",
            url: `${endpoint}/books`
          })
            .then(res => setBooks(res.data)) 
            .catch(err => {
                console.error('Error fetching books:', err);
        });
    },[isCreateBook, isUpdateBook])

    return(<div className="books-page" ref={tooltipRef}>
        <div className="container">
            <div className="row">
                <h3 className="text-center text-muted mb-5">Books</h3>
                <div className="col-sm-5 mb-3">
                    <span className="position-relative">
                        <input type="text" className="text-center bg-info ps-sm-2 rounded-5 border-dark border-0" id="update-book-user-email-input" name="search-books" placeholder={`${role==="Librarian" ? `ID, ` : ``}Title or Author`} onChange={e=>setSearchKeyword(e.target.value)}/>
                        <i className="fa fa-search position-absolute top-50 translate-middle-y end-0 me-2 text-muted text-white" aria-hidden="true"></i>
                    </span>
                </div>
                <div className="col-sm-4 mb-3">
                    <span>
                        <button className="btn btn-info w-100 p-0 rounded-2" onClick={()=>toggleFilterMenu("Filter")}>
                            <i className="fa-solid fa-shuffle"></i> Filter
                        </button>
                    </span>
                </div>
                <div className="col-sm-3 mb-3">
                    <span>
                        <button className="btn btn-info w-100 p-0 rounded-2" onClick={()=>toggleFilterMenu("Sort")}>
                            <i className="fa-solid fa-arrow-down-wide-short"></i> 
                            <span>Sort</span> 
                            { sortOn!=="Relevance" && <span>⚪</span> }
                        </button>
                    </span>
                </div>
                { filterMenu==="Filter" && <div className="row mb-3">
                    <div className="col-sm-5"></div>
                    <div className="col-sm-7 px-2">
                        <span>Subjects: </span>
                        { subjects.map(subject=><button className="btn btn-outline-secondary btn-filter px-3 py-1 ms-1 rounded-4">{subject}</button>)}
                        <span>Genres: </span>
                   </div>
                </div> }
                { filterMenu==="Sort" && <div className="row mb-3">
                    <div className="col-sm-9"></div>
                    <div className="col-sm-3 d-flex">
                        <button className={`btn btn-outline-secondary btn-sort px-3 py-1 ms-3 rounded-4 ${sortOn==="Relevance" ? `btn-secondary text-light`:``}`} onClick={()=>toggleSort("Relevance")}>Relevance</button>
                        <button className={`btn btn-outline-secondary btn-sort px-3 py-1 ms-1 rounded-4 ${sortOn==="Most Borrowed" ? `btn-secondary text-light`:``}`} onClick={()=>toggleSort("Most Borrowed")}>Most Borrowed</button>
                        <button className={`btn btn-outline-secondary btn-sort px-3 py-1 ms-1 rounded-4 ${sortOn==="Latest" ? `btn-secondary text-light`:``}`} onClick={()=>toggleSort("Latest")}>Latest</button>
                    </div> 
                </div> }
                { books.map((book,i)=>{
                    return<div key={i} className="col-12 col-sm-6 col-md-4" onClick={()=>handleShowBookModal(book)}>
                        <div className="card mb-3 p-3">
                            <div className="row d-flex py-0">
                            <div className="col-7">
                                <h5 className="card-title">{book.title}</h5>
                                <h6 className="card-subtitle text-muted">{book.author}</h6>
                                <span className="badge rounded-pill px-2 me-1 bg-primary">{book.subject}</span>
                                <span className={`badge rounded-pill px-2 ${book.genre==="Non-fiction" ? `bg-secondary` : `bg-dark`}`}>{book.genre}</span>
                                <p> 
                                    { role !== "User" && book.isAvailable ? 
                                        <span className="badge border px-3 py-2 mt-1 border-success text-success">Available</span> 
                                        : role !== "User" && !book.isAvailable ? 
                                        <span className="badge border px-3 py-2 mt-1 border-danger text-danger">Not Available</span> 
                                        : role === "User" && book.isAvailable ? 
                                        <>
                                            <button className="btn btn-light btn-outline-dark me-1 mt-1" data-tooltip-id={`tooltip-borrow-${book.bookId}`}><i className="fa-brands fa-opencart"></i></button>
                                            <button className="btn btn-outline-success reserve-btn mt-1" data-tooltip-id={`tooltip-reserve-${book.bookId}`}>Reserve</button>
                                        </>
                                        : role === "User" && !book.isAvailable ? 
                                        <button className="btn btn-outline-danger me-2">Not available</button>
                                        : null
                                    }
                                </p>
                                <Tooltip id={`tooltip-reserve-${book.bookId}`} className={`${!book.isReturned ? `d-block` : `d-none` } tooltip-reserve`} delayShow={200} openEvents={{ click: true }} closeEvents={{ click: true }} globalCloseEvents={{ clickOutsideAnchor: true }} clickable={true}>
                                    <div className="text-center">
                                    <p>Would you like to Reserve this Book?</p>
                                    <button className="tooltip-button btn border-success rounded-5 text-success" onMouseDown={()=>handleReservation(book.bookId)}><i className="fa fa-check"></i></button>
                                    </div>
                                </Tooltip>
                                <Tooltip id={`tooltip-borrow-${book.bookId}`} className={`${!book.isReturned ? `d-block` : `d-none` } tooltip-borrow`} delayShow={200} openEvents={{ click: true }} closeEvents={{ click: true }} globalCloseEvents={{ clickOutsideAnchor: true }} clickable={true}>
                                    <div className="text-center">
                                    <p>Would you like to Borrow this Book?</p>
                                    <button className="tooltip-button btn border-success rounded-5 text-success" onMouseDown={()=>handleReservation(book.bookId)}><i className="fa fa-check"></i></button>
                                    </div>
                                </Tooltip>
                            </div>
                            <div className="col-5"><img className="w-100 book-image" src={`images/book-covers/${book.imageName}.jpg`} alt={book.coverImage} /></div>
                        </div>
                    </div>
                </div>
                })}
                { role==="Librarian" ? <button className="btn btn-dark mt-1 mb-3" onClick={()=>setIsCreateBook(true)}>Add Book</button> : null}
                <BookCreateModal isCreateBook={isCreateBook} setIsCreateBook={setIsCreateBook}/>
                <BookUpdateModal isUpdateBook={isUpdateBook} setIsUpdateBook={setIsUpdateBook} book={selectedBook} endpoint={endpoint}/>
            </div>
        </div>
    </div>)
}

export default BooksPage;