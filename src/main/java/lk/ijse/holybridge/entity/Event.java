package lk.ijse.holybridge.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Entity
public class Event{
    @Id
    private int eventId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private LocalDateTime eventDate;

    @Column(nullable = false)
    private String description;

    private String imagepath;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "parish_id", nullable = false)
    private Parish parish;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @OneToMany(mappedBy = "event", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE}, orphanRemoval = true)
    private List<EventDetail> events = new ArrayList<>();

    public Event() {

    }

    public Event(int eventId, String title, LocalDateTime eventDate, String description, String imagepath, Parish parish, Category category, List<EventDetail> events) {
        this.eventId = eventId;
        this.title = title;
        this.eventDate = eventDate;
        this.description = description;
        this.imagepath = imagepath;
        this.parish = parish;
        this.category = category;
        this.events = events;
    }

    public Event(int eventId, String title, LocalDateTime eventDate, String description, String imagepath, Parish parish, Category category) {
        this.eventId = eventId;
        this.title = title;
        this.eventDate = eventDate;
        this.description = description;
        this.imagepath = imagepath;
        this.parish = parish;
        this.category = category;
    }

    public int getEventId() {
        return eventId;
    }

    public void setEventId(int eventId) {
        this.eventId = eventId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDateTime getEventDate() {
        return eventDate;
    }

    public void setEventDate(LocalDateTime eventDate) {
        this.eventDate = eventDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImagepath() {
        return imagepath;
    }

    public void setImagepath(String imagepath) {
        this.imagepath = imagepath;
    }

    public Parish getParish() {
        return parish;
    }

    public void setParish(Parish parish) {
        this.parish = parish;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public List<EventDetail> getEvents() {
        return events;
    }

    public void setEvents(List<EventDetail> events) {
        this.events = events;
    }
}
