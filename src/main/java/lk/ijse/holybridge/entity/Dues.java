package lk.ijse.holybridge.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "dues")
public class Dues{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int duesId;

    @Column(nullable = false)
    private double amount;

    @Column(nullable = false)
    private LocalDate dueDate;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    public Dues() {

    }

    public Dues(int duesId, double amount, LocalDate dueDate, Member member) {
        this.duesId = duesId;
        this.amount = amount;
        this.dueDate = dueDate;
        this.member = member;
    }

    public int getDuesId() {
        return duesId;
    }

    public void setDuesId(int duesId) {
        this.duesId = duesId;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public Member getMember() {
        return member;
    }

    public void setMember(Member member) {
        this.member = member;
    }
}