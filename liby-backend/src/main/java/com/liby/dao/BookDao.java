package com.liby.dao;

import com.liby.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class BookDao {
    private final JdbcTemplate jdbcTemplate;
    @Autowired
    public BookDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    private Book mapRowToBook(ResultSet rs, int rowNum) throws SQLException {
        Book book = new Book();
        book.setBookId(rs.getInt("book_id"));
        book.setTitle(rs.getString("title"));
        book.setAuthor(rs.getString("author"));
        book.setGenre(rs.getString("genre"));
        book.setSubject(rs.getString("subject"));
        book.setLanguage(rs.getString("language"));
        book.setPublicationDate(rs.getDate("publication_date"));
        book.setImageName(rs.getString("image_name"));
        book.setAvailability(rs.getBoolean("availability"));
        book.setTotalBorrows(rs.getInt("total_borrows"));
        book.setBorrowsThirtyDays(rs.getInt("borrows_thirty_days"));
        return book;
    }
    public List<Book> getAllBooks() {
        String sql = "SELECT * FROM books where deleted = FALSE";
        return jdbcTemplate.query(sql, this::mapRowToBook);
    }
    public Book getBookById(int bookId) {
        String sql = "SELECT * FROM books WHERE book_id = ?";
        return jdbcTemplate.queryForObject(sql, this::mapRowToBook, bookId);
    }
    public Book saveBook(Book book) {
        String sql = "INSERT INTO books (title, author, genre, subject, language, publication_date, image_name) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql,
                book.getTitle(),
                book.getAuthor(),
                book.getGenre(),
                book.getSubject(),
                book.getLanguage(),
                book.getPublicationDate(),
                book.getImageName());
        return book;
    }

    public boolean doesBookExist(int bookId) {
        String sql = "SELECT COUNT(*) FROM books WHERE book_id = ?";
        int count = jdbcTemplate.queryForObject(sql, Integer.class, bookId);
        return count > 0;
    }
    public Book updateBook(int bookId, Book updatedBook) {
        if(doesBookExist(bookId)){
            String sql = "UPDATE books SET title = ?, author = ?, genre = ?, subject = ?, language = ?, " +
                    "publication_date = ?, image_name = ?, availability = ?, total_borrows = ?, borrows_thirty_days = ? " +
                    "WHERE book_id = ?";
            jdbcTemplate.update(sql,
                    updatedBook.getTitle(),
                    updatedBook.getAuthor(),
                    updatedBook.getGenre(),
                    updatedBook.getSubject(),
                    updatedBook.getLanguage(),
                    updatedBook.getPublicationDate(),
                    updatedBook.getImageName(),
                    updatedBook.getAvailability(),
                    updatedBook.getTotalBorrows(),
                    updatedBook.getBorrowsThirtyDays(),
                    bookId);
            return updatedBook;
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body("Book not found");
            return null;
        }
    }
    public void deleteBook(int bookId) {
        if(doesBookExist(bookId)) {
            String sql = "UPDATE books SET deleted = TRUE where book_id = ?";
            jdbcTemplate.update(sql, bookId);
            ResponseEntity.ok("Book marked as deleted");
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body("Book not found");
        }
    }
}
