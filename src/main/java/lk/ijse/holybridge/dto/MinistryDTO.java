package lk.ijse.holybridge.dto;

public class MinistryDTO {
    private int id;
    private String ministryName;
    private String description;
    private String address;

    public MinistryDTO(String ministryName, String description, String address) {
        this.ministryName = ministryName;
        this.description = description;
        this.address = address;
    }

    public MinistryDTO() {

    }

    public MinistryDTO(int id, String ministryName, String description, String address) {
        this.id = id;
        this.ministryName = ministryName;
        this.description = description;
        this.address = address;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMinistryName() {
        return ministryName;
    }

    public void setMinistryName(String ministryName) {
        this.ministryName = ministryName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
