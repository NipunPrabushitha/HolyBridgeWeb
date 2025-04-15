package lk.ijse.holybridge.dto;

import lk.ijse.holybridge.entity.Parish;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
public class OrphanDTO {
    private int orphanId;
    private String name;
    private String imagepath;
    private LocalDate dateOfBirth;
    private String gender;
    private ParishDTO parishDTO;

    public OrphanDTO() {

    }

    public OrphanDTO(int orphanId, String name, String imagepath, LocalDate dateOfBirth, String gender, ParishDTO parishDTO) {
        this.orphanId = orphanId;
        this.name = name;
        this.imagepath = imagepath;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.parishDTO = parishDTO;
    }

    public OrphanDTO(String name, String imagepath, LocalDate dateOfBirth, String gender, ParishDTO parishDTO) {
        this.name = name;
        this.imagepath = imagepath;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.parishDTO = parishDTO;
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

    public ParishDTO getParishDTO() {
        return parishDTO;
    }

    public void setParishDTO(ParishDTO parishDTO) {
        this.parishDTO = parishDTO;
    }

    public int getOrphanId() {
        return orphanId;
    }

    public void setOrphanId(int orphanId) {
        this.orphanId = orphanId;
    }
}
