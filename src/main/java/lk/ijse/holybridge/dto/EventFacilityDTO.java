package lk.ijse.holybridge.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


public class EventFacilityDTO {
    private int facilityId;
    private String name;
    private String type;
    private Integer capacity;
    private Boolean available;
    private String description;

    public EventFacilityDTO() {

    }

    public EventFacilityDTO(int facilityId, String name, String type, Integer capacity, Boolean available, String description) {
        this.facilityId = facilityId;
        this.name = name;
        this.type = type;
        this.capacity = capacity;
        this.available = available;
        this.description = description;
    }

    public EventFacilityDTO(String name, String type, Integer capacity, Boolean available, String description) {
        this.name = name;
        this.type = type;
        this.capacity = capacity;
        this.available = available;
        this.description = description;
    }

    public int getFacilityId() {
        return facilityId;
    }

    public void setFacilityId(int facilityId) {
        this.facilityId = facilityId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
