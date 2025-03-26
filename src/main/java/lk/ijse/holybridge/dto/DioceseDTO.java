package lk.ijse.holybridge.dto;

public class DioceseDTO {
    private int id;
    private String name;
    private String description;
    private String address;
    private String bishopName;
    private MinistryDTO ministry;

    public DioceseDTO() {

    }

    public DioceseDTO(int id, String name, String description, String address, String bishopName, MinistryDTO ministry) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.address = address;
        this.bishopName = bishopName;
        this.ministry = ministry;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getBishopName() {
        return bishopName;
    }

    public void setBishopName(String bishopName) {
        this.bishopName = bishopName;
    }

    public MinistryDTO getMinistry() {
        return ministry;
    }

    public void setMinistry(MinistryDTO ministry) {
        this.ministry = ministry;
    }
}
