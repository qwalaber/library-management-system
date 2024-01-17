import React, { useContext, useState } from "react";

import TransactionsDataDummy from "../assets/data/TransactionsDataDummy";

import { API_ENDPOINT } from "../assets/configuration/config";
import { AuthContext } from "../contexts/AuthContext";

const dummyActive = TransactionsDataDummy.filter(transaction => transaction.isReturned === false);
const dummyAll = TransactionsDataDummy.filter(transaction => transaction.isReturned === true);

const UserPage = () => {

    const { authUser } = useContext(AuthContext);
    const todayDate = new Date().setHours(0, 0, 0, 0);
    const [ activeTransactions, setActiveTransactions ] = useState(dummyActive);
    const [ allTransactions, setAllTransactions ] = useState(dummyAll);

    const getCardContent = ( date, isOverdue ) => {
        const daysDue = Math.ceil((date - todayDate) / 1000 / 60 / 60 / 24);

        if (isOverdue!==undefined) {
            if (isOverdue && daysDue===1) return <p className="mb-0">1 day <br/> Overdue</p>;
            if (isOverdue) return <p className="mb-0">{-daysDue} days <br/> Overdue</p>;
            if (daysDue === 0) return <p className="mb-0">Due Today</p>;
            return <p className="mb-0">Due in <br/> {daysDue} days</p>
        } return <p className="mb-0">Return on <br /> {formatReturnDate(date)}</p>
    }

    const formatReturnDate = dateString => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
        const date = new Date(dateString);
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        
        return `${day} ${month} ${year}`;
    }

    return(<div className="user-page">
        <div className="container">
            <div className="row" data-masonry='{"percentPosition": true }'>
                <h3 className="text-center text-muted">Hi, {authUser.email}</h3>
                <h6 className="mt-4">Current Books</h6>
                { activeTransactions.map(transaction=>{
                    const dueDate = new Date(transaction.dueDate).setHours(0, 0, 0, 0);
                    const isOverdue = dueDate < todayDate;
                    return <div className="col-sm-2">
                        <div className={`card text-center ${isOverdue ? `bg-danger` : `bg-warning`} mb-3`}>
                            <div className="card-header">
                                <p className="fw-bold mb-0">Book Name ({transaction.bookId})</p>
                            </div>
                            <div className="card-body">
                                { getCardContent(dueDate, isOverdue) }
                            </div> 
                        </div>
                    </div>}) }
                <h6 className="mt-4">Past Transactions</h6>
                { allTransactions.map(transaction=>{
                    const returnDate = new Date(transaction.returnDate).setHours(0, 0, 0, 0)
                    return <div className="col-sm-2">
                        <div className="card text-center bg-info mb-3">
                            <div className="card-header">
                                <p className="fw-bold mb-0">{transaction.bookId}</p>
                            </div>
                            <div className="card-body">
                                { getCardContent(transaction.returnDate) }
                            </div>
                        </div>
                    </div>
                }) }
            </div>
        </div>
    </div>)
}

export default UserPage;