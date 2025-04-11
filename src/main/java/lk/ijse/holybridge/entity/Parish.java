package lk.ijse.holybridge.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;
import java.util.UUID;
@Entity
public class Parish {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int parishId;
    private String name;
    private String description;
    private String address;
    private String fartherName;

    @ManyToOne
    @JoinColumn(name = "diocese_id", nullable = false)
    private Diocese diocese;

    @OneToMany(mappedBy = "parish", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Event> events;

    public Parish() {
    }

    public Parish(int parishId, String name, String description, String address, String fartherName, Diocese diocese) {
        this.parishId = parishId;
        this.name = name;
        this.description = description;
        this.address = address;
        this.fartherName = fartherName;
        this.diocese = diocese;
    }

    public Parish(int parishId, String name, String description, String address, String fartherName, Diocese diocese, List<Event> events) {
        this.parishId = parishId;
        this.name = name;
        this.description = description;
        this.address = address;
        this.fartherName = fartherName;
        this.diocese = diocese;
        this.events = events;
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

    public Diocese getDiocese() {
        return diocese;
    }

    public void setDiocese(Diocese diocese) {
        this.diocese = diocese;
    }

    public List<Event> getEvents() {
        return events;
    }

    public void setEvents(List<Event> events) {
        this.events = events;
    }
}
