package lk.ijse.holybridge.dto;

import lk.ijse.holybridge.entity.Member;

import java.time.LocalDate;
public class DuesDTO {
    private int duesId;
    private double amount;
    private LocalDate dueDate;
    private MemberDTO member;

    public DuesDTO() {

    }

    public DuesDTO(int duesId, double amount, LocalDate dueDate, MemberDTO member) {
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

    public MemberDTO getMember() {
        return member;
    }

    public void setMember(MemberDTO member) {
        this.member = member;
    }
}
