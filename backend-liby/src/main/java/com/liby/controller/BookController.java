package com.liby.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.liby.model.Book;
import com.liby.dao.BookDao;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/books")
public class BookController {
    @Autowired
    private BookDao bookDao;

    @GetMapping
    public List<Book> getAllBooks() {
        try {
            return bookDao.getAllBooks();
        } catch (Exception e) {
            e.printStackTrace();
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to get all books");
            throw new RuntimeException("Failed to fetch books", e);
        }
    }

    @GetMapping("/{id}")
    public Book getBook(@PathVariable int id) {
        try {
            return bookDao.getBookById(id);
        } catch (Exception e) {
            e.printStackTrace();
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to get book by id");
            throw new RuntimeException("Failed to fetch book by Id", e);
        }
    }

    @GetMapping("/subjects")
    public List<String> getAllSubjects() {
        try {
            return bookDao.getAllSubjects();
        } catch (Exception e) {
            e.printStackTrace();
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to get all subjects");
            throw new RuntimeException("Failed to fetch subjects", e);
        }
    }

    @PostMapping("/create")
    public Book createBook(@RequestBody Book book) {
        try {
            return bookDao.saveBook(book);
        } catch (Exception e) {
            e.printStackTrace();
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save new book");
            throw new RuntimeException("Failed to save new book", e);
        }
    }

    @PutMapping("/edit/{id}")
    public Book updateBook(@PathVariable int id, @RequestBody Book updatedBook) {
        try{
            return bookDao.updateBook(id, updatedBook);
        } catch (Exception e) {
                e.printStackTrace();
                ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update book");
                return null;
        }
    }

    @DeleteMapping("/delete/{id}")
    public void deleteBook(@PathVariable int id) {
        try {
            bookDao.deleteBook(id);
        } catch (Exception e) {
            e.printStackTrace();
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Book deletion failed");
            throw new RuntimeException("Failed to delete book", e);
        }
    }
}
