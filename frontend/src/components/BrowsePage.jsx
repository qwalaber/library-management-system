import React, { useContext, useState, useEffect } from "react";

import { AuthContext } from "../AuthContext";
import axios from "axios";

import BooksDataDummy from "./../assets/data/BooksDataDummy";

import NewBookModal from "./modals/NewBookModal";
import UpdateBook from "./modals/UpdateBook";

const booksApi = '';

const BrowsePage = () => {

    const { role } = useContext(AuthContext);

    const [ books, setBooks ] = useState(BooksDataDummy);
    const [ searchKeyword, setSearchKeyword ] = useState(""); 
    const [ isCreateBook,  setIsCreateBook ] = useState(false);
    const [ selectedBook, setSelectedBook ] = useState({});
    const [ isUpdateMode, setIsUpdateMode ] = useState(false);

    const handleShowBookModal = book => {
        if(role==="Librarian"){
            setSelectedBook(book);
            setIsUpdateMode(true);
        }
    }

    useEffect(()=>{
        axios
            .get(booksApi, { params: { search: searchKeyword }})
            .then(res => setBooks(res.data))
            .catch(err => console.error('Error fetching books:', err));
    },[searchKeyword])

    return(<div className="books-page">
        <div className="container">
            <div className="row">
                <h3 className="text-center text-muted mb-5">Books</h3>
                <div className="col-sm-3 mb-4">
                    <span>
                        <button className="btn btn-info w-100  p-0 rounded-2">
                            <i class="fa-solid fa-shuffle"></i> Filter
                        </button>
                    </span>
                </div>
                <div className="col-sm-2 mb-4">
                    <span>
                        <button className="btn btn-info w-100  p-0 rounded-2">
                            <i class="fa-solid fa-arrow-down-wide-short"></i> Sort
                        </button>
                    </span>
                </div>
                <div className="col-sm-7 mb-4">
                    <span className="position-relative">
                        <input type="text" className="text-center bg-info ps-sm-2 rounded-5 border-dark border-0" id="update-book-user-email-input" name="search-books" placeholder={`${role==="Librarian" ? `ID, ` : ``}Title, Author, Genre or Subject`} onChange={e=>setSearchKeyword(e.target.value)}/>
                        <i className="fa fa-search position-absolute top-50 translate-middle-y end-0 me-2 text-muted text-white" aria-hidden="true"></i>
                    </span>
                </div>
                { books.map((book,i)=>{
                    return<div key={i} className="col-12 col-sm-6 col-md-4" onClick={()=>handleShowBookModal(book)}>
                        <div className="card mb-3 p-3">
                            <div className="row d-flex py-0">
                            <div className="col-7">
                                <h5 className="card-title">{book.title}</h5>
                                <h6 className="card-subtitle text-muted">{book.author}</h6>
                                <span className={`badge rounded-pill me-1 ${book.genre==="Non-fiction" ? `bg-dark` : `bg-secondary`}`}>{book.genre}</span>
                                <span className="badge rounded-pill bg-primary">{book.subject}</span>
                                <p>{ book.isAvailable ? <span className="badge border border-success text-success">Available</span>:<span className="badge border border-danger text-danger">Not Available</span> }</p>
                            </div>
                            <div className="col-5"><img className="w-100" src={`images/book-covers/${book.coverImage}.jpg`} alt={book.coverImage} /></div>
                        </div>
                    </div>
                </div>
                })}
                { role==="Librarian" ? <button className="btn btn-info mt-1 mb-3" onClick={()=>setIsCreateBook(true)}>Add Book</button> : null}
                <NewBookModal isCreateBook={isCreateBook} setIsCreateBook={setIsCreateBook}/>
                <UpdateBook isUpdateMode={isUpdateMode} setIsUpdateMode={setIsUpdateMode} book={selectedBook}/>
            </div>
        </div>
    </div>)
}

export default BrowsePage;