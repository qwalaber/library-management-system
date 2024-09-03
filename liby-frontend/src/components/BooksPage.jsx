import React, { useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Tooltip } from 'react-tooltip';

import { AuthContext } from '../assets/contexts/AuthContext';
import { API_ENDPOINT } from '../assets/configuration/config';
import NewBookModal from './modals/NewBookModal';
import EditBookModal from './modals/EditBookModal';

const BooksPage = () => {

    const tooltipRef = useRef(null);

    const sortOptions = ['Alphabetically', 'Relevance', 'Newest releases', 'Most borrowed'];

    const { authUser } = useContext(AuthContext);

    const [ books, setBooks ] = useState([]);
    const [ allBooks, setAllBooks ] = useState([]);
    const [ isNewBookMode,  setIsNewBookMode ] = useState(false);
    const [ selectedBook, setSelectedBook ] = useState({});
    const [ isEditBookMode, setIsEditBookMode ] = useState(false);
    const [ subjectOptions , setSubjectOptions ] = useState([]);
    const [ genreOptions , setGenreOptions ] = useState([]);
    const [ filterMenu, setFilterMenu ] = useState('');
    const [ activeFilters, setActiveFilters ] = useState({
        searchKeyword: '',
        subjects: [],
        genres: [],
        sort: 'Alphabetically'
    })

    const handleFilterOptionDisplay = type => {
        if(filterMenu === '' || filterMenu !== type) setFilterMenu(type);
        else if(filterMenu === type) setFilterMenu("");
    }

    const handleActiveFilters = (key, value) => {
        if(key==='searchKeyword' || key==='sort'){
            setActiveFilters({...activeFilters, [key]: value});
            return;
        }
        if(activeFilters[key].includes(value)){
            let index = activeFilters[key].indexOf(value);
            let newValues = [...activeFilters[key].slice(0,index), ...activeFilters[key].slice(index+1,activeFilters[key].length)];
            setActiveFilters({...activeFilters, [key]: newValues});
            return;
        }
        setActiveFilters({...activeFilters, [key]: [...activeFilters[key], value]});
        return;
    }

    const handleFilteredBooks = () => {
        let filteredSortedBooks = [...allBooks];
        if(activeFilters.genres.length>=1) filteredSortedBooks = filteredSortedBooks.filter(book=>activeFilters.genres.includes(book.genre));
        if(activeFilters.subjects.length>=1) filteredSortedBooks = filteredSortedBooks.filter(book=>activeFilters.subjects.includes(book.subject));
        if(activeFilters.searchKeyword !== '') filteredSortedBooks = filteredSortedBooks.filter(book=>{
            for(let key in book) {
                if(typeof book[key] === 'string' && book[key].toLowerCase().includes(activeFilters.searchKeyword)) return true
            }
        })
        if(activeFilters.sort === 'Alphabetically') filteredSortedBooks.sort((a, b) => {
            if (a.availability === b.availability) {
                const startsWithLetterA = isNaN(a.title.charAt(0));
                const startsWithLetterB = isNaN(b.title.charAt(0));
    
                if (startsWithLetterA && !startsWithLetterB) return -1;
                else if (!startsWithLetterA && startsWithLetterB) return 1;
                else if (startsWithLetterA && startsWithLetterB) return a.title.localeCompare(b.title)
                else return parseFloat(a.title) - parseFloat(b.title);
            }
            return a.availability ? -1 : 1;
        });
        setBooks(filteredSortedBooks);
    }

    const handleReservation = bookId => {
        const reservation = {
            bookId: bookId,
            userEmail: authUser.email
        }
        axios.post(`${API_ENDPOINT}/reservations`, reservation)
            .then(()=>{
                axios.get(`${API_ENDPOINT}/books`)
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
            userId: authUser.userId,
            userEmail: authUser.email
        }
        axios.post(`${API_ENDPOINT}/transactions`, borrow)
            .then(()=>{
                axios.get(`${API_ENDPOINT}/books`)
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
        console.log("yaho")
        if(authUser && authUser.role==="librarian"){
            setSelectedBook(book);
            setIsEditBookMode(true);
        }
    }

    useEffect(()=>{
        if(!isEditBookMode && !isNewBookMode) axios({
            method: "get",
            url: `${API_ENDPOINT}/books`
          })
            .then(res => {
                setAllBooks(res.data);
                setSubjectOptions([...new Set([...res.data].map(book=>book.subject))]);
                setGenreOptions([...new Set([...res.data].map(book=>book.genre))]);
            }) 
            .catch(err => {
                console.error('Error fetching books:', err);
                return;
        });
    },[isNewBookMode, isEditBookMode])

    useEffect(() => {
        handleFilteredBooks();
    }, [allBooks, activeFilters]);

    return(<div className="books-page" ref={tooltipRef}>
        <div className="container">
            <div className="row">
                <h3 className="text-center text-muted my-3 mt-lg-0 mb-lg-5">Books</h3>
                <div className="col-sm-4 mb-3">
                    <span>
                        <button className="btn btn-info w-100 p-0 rounded-2" onClick={()=>handleFilterOptionDisplay("Filter")}>
                            <i className="fa-solid fa-shuffle pe-1"></i>
                            <span>Filter</span>
                            {(activeFilters.subjects.length > 0 || activeFilters.genres.length > 0) && <i class="fa-solid fa-circle fa-2xs ms-1 text-tertiary"></i> }
                        </button>
                    </span>
                </div>
                <div className="col-sm-3 mb-3">
                    <span>
                        <button className="btn btn-info w-100 p-0 rounded-2" onClick={()=>handleFilterOptionDisplay("Sort")}>
                            <i className="fa-solid fa-arrow-down-wide-short pe-1"></i> 
                            <span>Sort</span> 
                            { activeFilters.sort!=='Alphabetically' && <i class="fa-solid fa-circle fa-2xs ms-1 text-tertiary"></i> }
                        </button>
                    </span>
                </div>
                <div className="col-sm-5 mb-3">
                    <span className="position-relative">
                        <input type="text" className="text-center bg-info ps-sm-2 rounded-5 border-dark border-0" id="update-book-user-email-input" name="search-books" placeholder={`${authUser && authUser.role==="librarian" ? `ID, ` : ``}Title or Author`} onChange={e=>handleActiveFilters('searchKeyword', e.target.value)}/>
                        <i className="fa fa-search position-absolute top-50 translate-middle-y end-0 me-2 text-muted text-white" aria-hidden="true"></i>
                    </span>
                </div>
            </div>
            <div className="row">
                {filterMenu==="Filter" && <div className="row mb-3">
                    <div className="px-2">
                        <span>Subjects: </span>
                        { subjectOptions.map((subject, key)=><button key={key} className={`btn btn-filter px-3 py-1 ms-1 rounded-4 ${activeFilters.subjects.includes(subject) ? `btn-secondary` : `btn-outline-secondary`}`} onClick={()=>handleActiveFilters('subjects', subject)}>{subject}</button>)}
                        <span>Genres: </span>
                        { genreOptions.map((genre, key)=><button key={key} className={`btn btn-filter px-3 py-1 ms-1 rounded-4 ${activeFilters.genres.includes(genre) ? `btn-secondary` : `btn-outline-secondary`}`} onClick={()=>handleActiveFilters('genres', genre)}>{genre}</button>)}
                   </div>
                </div> }
                {filterMenu==="Sort" && <div className="row mb-3">
                    <div className="col-sm-4"></div>
                    <div className="col-sm-8 d-flex">
                        { sortOptions.map((option, key)=><button key={key} className={`btn btn-outline-secondary btn-sort px-3 py-1 ms-1 rounded-4 ${activeFilters.sort===option ? `btn-secondary text-light`:``}`}>{option}</button> )}
                    </div> 
                </div> }
            </div>
            <div className="row">
                {books.map((book,i)=>{
                    return<div key={i} className={`col-12 col-md-6 col-lg-4 ${authUser && authUser.role==="librarian" ? `hover-pointer` : ``}`} onClick={()=>handleShowBookModal(book)}>
                        <div className="card mb-3 p-3">
                            <div className="row d-flex py-0">
                            <div className="col-7">
                                <h5 className="card-title">{book.title}</h5>
                                <h6 className="card-subtitle text-muted">{book.author}</h6>
                                <span className="badge rounded-pill px-2 me-1 bg-primary">{book.subject}</span>
                                <span className={`badge rounded-pill px-2 ${book.genre==="Non-fiction" ? `bg-secondary` : `bg-dark`}`}>{book.genre}</span>
                                <p> 
                                    { authUser ? authUser.role !== "user" && book.availability ? 
                                        <span className="badge border px-3 py-2 mt-1 border-success text-success">Available</span> 
                                        : authUser.role !== "user" && !book.availability ? 
                                        <span className="badge border px-3 py-2 mt-1 border-danger text-danger">Not Available</span> 
                                        : authUser.role === "user" && book.availability ? 
                                        <>
                                            <button className="btn btn-light btn-outline-dark me-1 mt-1" data-tooltip-id={`tooltip-borrow-${book.bookId}`}><i className="fa-brands fa-opencart"></i></button>
                                            <button className="btn btn-outline-success reserve-btn mt-1" data-tooltip-id={`tooltip-reserve-${book.bookId}`}>Reserve</button>
                                        </>
                                        : authUser.role === "user" && !book.availability ? 
                                        <button className="btn btn-outline-danger me-2">Not available</button>
                                        : null : null
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
                                    <button className="tooltip-button btn border-success rounded-5 text-success" onMouseDown={()=>handleBorrow(book.bookId)}><i className="fa fa-check"></i></button>
                                    </div>
                                </Tooltip>
                            </div>
                            <div className="col-5"><img className="w-100 book-image" src={`images/book-covers/${book.imageName}.jpg`} alt={book.coverImage} /></div>
                        </div>
                    </div>
                </div>
                })}
                { authUser && authUser.role==="librarian" ? <button className="btn btn-dark mt-1 mb-3" onClick={()=>setIsNewBookMode(true)}>Add Book</button> : null}
            </div>
        </div>
        <EditBookModal isEditBookMode={isEditBookMode} setIsEditBookMode={setIsEditBookMode} book={selectedBook} API_ENDPOINT={API_ENDPOINT}/>
        <NewBookModal isNewBookMode={isNewBookMode} setIsNewBookMode={setIsNewBookMode} API_ENDPOINT={API_ENDPOINT}/>
    </div>)
}

export default BooksPage;