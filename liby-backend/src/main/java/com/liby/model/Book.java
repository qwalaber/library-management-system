package com.liby.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "Books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_id")
    private int bookId;
    private String title;
    private String author;
    private String genre;
    private String subject;
    private String language;
    @Column(name = "publication_date")
    private Date publicationDate;
    @Column(name = "image_name")
    private String imageName;
    @Column(name = "availability")
    private boolean availability;
    @Column(name = "total_borrows")
    private int totalBorrows;
    @Column(name = "borrows_thirty_days")
    private int borrowsThirtyDays;

    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public Date getPublicationDate() {
        return publicationDate;
    }

    public void setPublicationDate(Date publicationDate) {
        this.publicationDate = publicationDate;
    }

    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

    public boolean getAvailability() {
        return availability;
    }

    public void setAvailability(boolean availability) {
        this.availability = availability;
    }

    public int getTotalBorrows() {
        return totalBorrows;
    }

    public void setTotalBorrows(int totalBorrows) {
        this.totalBorrows = totalBorrows;
    }

    public int getBorrowsThirtyDays() {
        return borrowsThirtyDays;
    }

    public void setBorrowsThirtyDays(int borrowsThirtyDays) {
        this.borrowsThirtyDays = borrowsThirtyDays;
    }
}
