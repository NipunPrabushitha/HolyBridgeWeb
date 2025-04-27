package lk.ijse.holybridge.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

public class DonationDTO {
    private int donationId;
    private Double amount;
    private LocalDate date;
    private String note;
    private UserDTO userDTO;

    public DonationDTO() {

    }

    public DonationDTO(int donationId, Double amount, LocalDate date, String note, UserDTO userDTO) {
        this.donationId = donationId;
        this.amount = amount;
        this.date = date;
        this.note = note;
        this.userDTO = userDTO;
    }

    public DonationDTO(Double amount, LocalDate date, String note, UserDTO userDTO) {
        this.amount = amount;
        this.date = date;
        this.note = note;
        this.userDTO = userDTO;
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

    public UserDTO getUserDTO() {
        return userDTO;
    }

    public void setUserDTO(UserDTO userDTO) {
        this.userDTO = userDTO;
    }

    @Override
    public String toString() {
        return "DonationDTO{" +
                "donationId=" + donationId +
                ", amount=" + amount +
                ", date=" + date +
                ", note='" + note + '\'' +
                ", userDTO=" + userDTO +
                '}';
    }
}
