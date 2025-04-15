package lk.ijse.holybridge.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "orphan")
public class Orphan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orphanId;

    @Column(nullable = false)
    private String name;

    private String imagepath;

    @Column(nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd") // Ensures correct parsing
    private LocalDate dateOfBirth;

    @Column(nullable = false)
    private String gender;

    @ManyToOne
    @JoinColumn(name = "parish_id", nullable = false)
    private Parish parish;

    public Orphan() {

    }

    public Orphan(int orphanId, String name, String imagepath, LocalDate dateOfBirth, String gender, Parish parish) {
        this.orphanId = orphanId;
        this.name = name;
        this.imagepath = imagepath;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.parish = parish;
    }

    public int getOrphanId() {
        return orphanId;
    }

    public void setOrphanId(int orphanId) {
        this.orphanId = orphanId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImagepath() {
        return imagepath;
    }

    public void setImagepath(String imagepath) {
        this.imagepath = imagepath;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Parish getParish() {
        return parish;
    }

    public void setParish(Parish parish) {
        this.parish = parish;
    }
}
