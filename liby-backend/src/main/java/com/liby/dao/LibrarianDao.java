package com.liby.dao;

import com.liby.model.Librarian;
import com.liby.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class LibrarianDao {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public LibrarianDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private Librarian mapRowToLibrarian(ResultSet rs, int rowNum) throws SQLException {
        Librarian librarian = new Librarian();
        librarian.setLibrarianId(rs.getInt("librarian_id"));
        librarian.setName(rs.getString("name"));
        librarian.setEmail(rs.getString("email"));
        librarian.setPassword(rs.getString("password"));
        librarian.setGender(rs.getString("gender"));
        librarian.setAddress(rs.getString("address"));
        librarian.setBirthdate(rs.getDate("birthdate"));
        librarian.setHireDate(rs.getDate("hire_date"));
        librarian.setCreatedAt(rs.getDate("created_at"));
        return librarian;
    }

    public List<Librarian> getAllLibrarians() {
        String sql = "SELECT * FROM librarians";
        return jdbcTemplate.query(sql, this::mapRowToLibrarian);
    }

    public Librarian getLibrarianById(int librarianId) {
        String sql = "SELECT * FROM librarians WHERE librarian_id = ?";
        return jdbcTemplate.queryForObject(sql, this::mapRowToLibrarian, librarianId);
    }

    public boolean doesLibrarianExist(String email) {
        try {
            String sql = "SELECT COUNT(*) FROM librarians WHERE email = ?";
            int count = jdbcTemplate.queryForObject(sql, Integer.class, email);
            return count > 0;
        } catch (EmptyResultDataAccessException e) {
            System.out.println("No librarian found with email: " + email);
            return false;
        }
    }


    public Librarian saveLibrarian(Librarian librarian) {
        String sql = "INSERT INTO librarians (name, email, password, gender, address, birthdate, hire_date, created_at) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql,
                librarian.getName(),
                librarian.getEmail(),
                librarian.getPassword(),
                librarian.getGender(),
                librarian.getAddress(),
                librarian.getBirthdate(),
                librarian.getHireDate(),
                librarian.getCreatedAt());
        return librarian;
    }

    public Librarian updateLibrarian(int librarianId, Librarian updatedLibrarian) {
        try {
            String sql = "UPDATE librarians SET name = ?, email = ?, password = ?, gender = ?, address = ?, " +
                    "birthdate = ?, hire_date = ?, created_at = ? WHERE librarian_id = ?";
            jdbcTemplate.update(sql,
                    updatedLibrarian.getName(),
                    updatedLibrarian.getEmail(),
                    updatedLibrarian.getPassword(),
                    updatedLibrarian.getGender(),
                    updatedLibrarian.getAddress(),
                    updatedLibrarian.getBirthdate(),
                    updatedLibrarian.getHireDate(),
                    updatedLibrarian.getCreatedAt(),
                    librarianId);
            return updatedLibrarian;
        } catch(EmptyResultDataAccessException e) {
            System.out.println("No librarian found with ID: " + librarianId + e);
            ResponseEntity.status(HttpStatus.NOT_FOUND).body("Librarian not updated");
            return null;
        }
    }

    public void deleteLibrarian(int librarianId) {
        try {
            String sql = "DELETE FROM librarians WHERE librarian_id = ?";
            jdbcTemplate.update(sql, librarianId);
        } catch(EmptyResultDataAccessException e) {
            System.out.println("No librarian found with ID: " + librarianId + e);
            ResponseEntity.status(HttpStatus.NOT_FOUND).body("Librarian not found");
        }
    }

    public Librarian findByEmail(String email) {
        try {
            String sql = "SELECT * FROM librarians WHERE email = ?";
            return jdbcTemplate.queryForObject(sql, this::mapRowToLibrarian, email);
        } catch (EmptyResultDataAccessException e) {
            System.out.println("No librarian found with email: " + email + e);
            return null;
        }
    }
}
