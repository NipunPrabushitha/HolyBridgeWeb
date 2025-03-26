package lk.ijse.holybridge.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
public class EventFacility{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int facilityId;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private String type; // Example: "Audio", "Venue", "Seating"

    @Column(nullable = false)
    private Integer capacity; // Example: 100 seats

    @Column(nullable = false)
    private Boolean available; // true = available, false = in use

    @Column
    private String description; // Example: "Includes sound system and stage"

    @OneToMany(mappedBy = "eventFacility", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE}, orphanRemoval = true)
    private List<EventDetail> eventDetails = new ArrayList<>();

    public EventFacility() {

    }

    public EventFacility(int facilityId, String name, String type, Integer capacity, Boolean available, String description, List<EventDetail> eventDetails) {
        this.facilityId = facilityId;
        this.name = name;
        this.type = type;
        this.capacity = capacity;
        this.available = available;
        this.description = description;
        this.eventDetails = eventDetails;
    }

    public EventFacility(int facilityId, String name, String type, Integer capacity, Boolean available, String description) {
        this.facilityId = facilityId;
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

    public List<EventDetail> getEventDetails() {
        return eventDetails;
    }

    public void setEventDetails(List<EventDetail> eventDetails) {
        this.eventDetails = eventDetails;
    }
}
