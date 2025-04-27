package lk.ijse.holybridge.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.UUID;



@Entity
public class Donation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int donationId;

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private LocalDate date;

    @Column
    private String note; // Optional note

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Donation() {

    }

    public Donation(int donationId, Double amount, LocalDate date, String note, User user) {
        this.donationId = donationId;
        this.amount = amount;
        this.date = date;
        this.note = note;
        this.user = user;
    }

    public Donation(Double amount, LocalDate date, String note, User user) {
        this.amount = amount;
        this.date = date;
        this.note = note;
        this.user = user;
    }

    public int getDonationId() {
        return donationId;
    }

    public void setDonationId(int donationId) {
        this.donationId = donationId;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Donation{" +
                "donationId=" + donationId +
                ", amount=" + amount +
                ", date=" + date +
                ", note='" + note + '\'' +
                ", user=" + user +
                '}';
    }
}
