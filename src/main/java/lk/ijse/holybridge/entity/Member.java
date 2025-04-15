package lk.ijse.holybridge.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "member")
public class Member{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int memberId;

    private String name;
    private String address;
    private String contactNumber;
    private String gender;

    private String imagepath;
    @Column(nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd") // Ensures correct parsing
    private LocalDate dateOfBirth;
    @ManyToOne
    @JoinColumn(name = "parish_id", nullable = false)
    private Parish parish;

    public Member(int memberId, String name, String address, String contactNumber, String gender, String imagepath, LocalDate dateOfBirth, Parish parish) {
        this.memberId = memberId;
        this.name = name;
        this.address = address;
        this.contactNumber = contactNumber;
        this.gender = gender;
        this.imagepath = imagepath;
        this.dateOfBirth = dateOfBirth;
        this.parish = parish;
    }

    public Member() {

    }

    public int getMemberId() {
        return memberId;
    }

    public void setMemberId(int memberId) {
        this.memberId = memberId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
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

    public Parish getParish() {
        return parish;
    }

    public void setParish(Parish parish) {
        this.parish = parish;
    }
}
