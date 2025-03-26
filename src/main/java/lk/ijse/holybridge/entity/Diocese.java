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
public class Diocese{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int uid;

    @Column(nullable = false, unique = true)
    private String name;
    private String description;
    private String address;
    private String bishopName;

    @ManyToOne
    @JoinColumn(name = "ministry_id", nullable = false)
    private Ministry ministry;

    @OneToMany(mappedBy = "diocese", cascade = {CascadeType.MERGE, CascadeType.MERGE, CascadeType.REMOVE}, orphanRemoval = true)
    private List<Parish> parishes = new ArrayList<>();

    public Diocese(int uid, String name, String description, String address, String bishopName, Ministry ministry) {
        this.uid = uid;
        this.name = name;
        this.description = description;
        this.address = address;
        this.bishopName = bishopName;
        this.ministry = ministry;
    }

    public Diocese() {

    }

    public Diocese(int uid, String name, String description, String address, String bishopName, Ministry ministry, List<Parish> parishes) {
        this.uid = uid;
        this.name = name;
        this.description = description;
        this.address = address;
        this.bishopName = bishopName;
        this.ministry = ministry;
        this.parishes = parishes;
    }

    public int getUid() {
        return uid;
    }

    public void setUid(int uid) {
        this.uid = uid;
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

    public Ministry getMinistry() {
        return ministry;
    }

    public void setMinistry(Ministry ministry) {
        this.ministry = ministry;
    }

    public List<Parish> getParishes() {
        return parishes;
    }

    public void setParishes(List<Parish> parishes) {
        this.parishes = parishes;
    }
}
