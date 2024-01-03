package com.liby.controller;

import com.liby.dao.LibrarianDao;
import com.liby.model.Librarian;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/librarians")
public class LibrarianController {
    @Autowired
    private LibrarianDao librarianDao;

    @GetMapping("/exists/{email}")
    public boolean doesLibrarianExist(@PathVariable String email) {
        return librarianDao.doesLibrarianExist(email);
    }

    @GetMapping
    public List<Librarian> getAllLibrarians() {
        try {
            return librarianDao.getAllLibrarians();
        } catch (Exception e) {
            e.printStackTrace();
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to get all librarians");
            throw new RuntimeException("Failed to fetch librarians", e);
        }
    }

    @GetMapping("/{id}")
    public Librarian getLibrarian(@PathVariable int id) {
        try {
            return librarianDao.getLibrarianById(id);
        } catch (Exception e) {
            e.printStackTrace();
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to get librarian by id");
            throw new RuntimeException("Failed to fetch librarian by Id", e);
        }
    }

    @PostMapping
    public Librarian createLibrarian(@RequestBody Librarian librarian) {
        try {
            return librarianDao.saveLibrarian(librarian);
        } catch (Exception e) {
            e.printStackTrace();
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save new librarian");
            throw new RuntimeException("Failed to save new librarian", e);
        }
    }

    @PutMapping("/{id}")
    public Librarian updateLibrarian(@PathVariable int librarianId, @RequestBody Librarian updatedLibrarian) {
        try {
            return librarianDao.updateLibrarian(librarianId, updatedLibrarian);
        } catch (Exception e) {
            e.printStackTrace();
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update librarian");
            return null;
        }
    }

    @DeleteMapping("/{id}")
    public void deleteLibrarian(@PathVariable int librarianId) {
        try {
            librarianDao.deleteLibrarian(librarianId);
        } catch (Exception e) {
            e.printStackTrace();
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Librarian deletion failed");
            throw new RuntimeException("Failed to delete librarian", e);
        }
    }
}
