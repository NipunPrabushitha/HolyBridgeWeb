package lk.ijse.holybridge.dto;



public class ParishDTO {
    private int parishId;
    private String name;
    private String description;
    private String address;
    private String fartherName;
    private DioceseDTO dioceseDTO;

    public ParishDTO() {

    }

    public ParishDTO(int parishId, String name, String description, String address, String fartherName, DioceseDTO dioceseDTO) {
        this.parishId = parishId;
        this.name = name;
        this.description = description;
        this.address = address;
        this.fartherName = fartherName;
        this.dioceseDTO = dioceseDTO;
    }

    public ParishDTO(String name, String description, String address, String fartherName, DioceseDTO dioceseDTO) {
        this.name = name;
        this.description = description;
        this.address = address;
        this.fartherName = fartherName;
        this.dioceseDTO = dioceseDTO;
    }

    public int getParishId() {
        return parishId;
    }

    public void setParishId(int parishId) {
        this.parishId = parishId;
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

    public String getFartherName() {
        return fartherName;
    }

    public void setFartherName(String fartherName) {
        this.fartherName = fartherName;
    }

    public DioceseDTO getDioceseDTO() {
        return dioceseDTO;
    }

    public void setDioceseDTO(DioceseDTO dioceseDTO) {
        this.dioceseDTO = dioceseDTO;
    }
}
