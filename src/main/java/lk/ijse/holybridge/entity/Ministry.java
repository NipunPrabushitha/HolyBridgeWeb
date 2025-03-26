package lk.ijse.holybridge.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
public class Ministry{
    @Id
    private int ministry_id;
    private String name;
    private String description;
    private String address;

    public Ministry(int ministry_id, String name, String description, String address) {
        this.ministry_id = ministry_id;
        this.name = name;
        this.description = description;
        this.address = address;
    }

    public Ministry() {

    }

    public int getMinistry_id() {
        return ministry_id;
    }

    public void setMinistry_id(int ministry_id) {
        this.ministry_id = ministry_id;
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
}
