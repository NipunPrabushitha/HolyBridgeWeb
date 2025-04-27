package lk.ijse.holybridge.dto;


import java.time.LocalDate;

public class MemberDTO {
    private int memberId;
    private String name;
    private String address;
    private String contactNumber;
    private String gender;
    private String imagepath; 
    private LocalDate dateOfBirth;
    private ParishDTO parishDTO;

    public MemberDTO() {

    }

    public MemberDTO(int memberId, String name, String address, String contactNumber, String gender, String imagepath, LocalDate dateOfBirth, ParishDTO parishDTO) {
        this.memberId = memberId;
        this.name = name;
        this.address = address;
        this.contactNumber = contactNumber;
        this.gender = gender;
        this.imagepath = imagepath;
        this.dateOfBirth = dateOfBirth;
        this.parishDTO = parishDTO;
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

    public ParishDTO getParishDTO() {
        return parishDTO;
    }

    public void setParishDTO(ParishDTO parishDTO) {
        this.parishDTO = parishDTO;
    }
}
