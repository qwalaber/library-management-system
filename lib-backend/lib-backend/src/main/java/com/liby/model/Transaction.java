package com.liby.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "Transactions")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaction_id")
    private int transactionId;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private int userId;
    @ManyToOne
    @JoinColumn(name = "book_id")
    private int bookId;
    @Column(name = "borrow_date")
    private Date borrowDate;
    @Column(name = "due_date")
    private Date dueDate;
    @Column(name = "return_date")
    private Date returnDate;
    @Column(name = "is_returned")
    private boolean isReturned;
    @Column(name = "is_renewed")
    private boolean isRenewed;
    @Column(name = "overdue_days")
    private int overdueDays;

    public int getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(int borrowId) {
        this.transactionId = transactionId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    public Date getBorrowDate() {
        return borrowDate;
    }

    public void setBorrowDate(Date borrowDate) {
        this.borrowDate = borrowDate;
    }
    
    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public Date getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(Date returnDate) {
        this.returnDate = returnDate;
    }
    
    public boolean getReturned() {
        return isReturned;
    }

    public void setReturned(boolean returned) {
        this.isReturned = returned;
    }
    
    public boolean getRenewed() {
        return isRenewed;
    }

    public void setRenewed(boolean renewed) {
        this.isRenewed = renewed;
    }
    
    public int getOverdueDays() {
        return overdueDays;
    }

    public void setOverdueDays(int overdueDays) {
        this.overdueDays = overdueDays;
    }
}