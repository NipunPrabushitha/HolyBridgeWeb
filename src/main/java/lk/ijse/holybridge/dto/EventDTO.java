package lk.ijse.holybridge.dto;

import java.time.LocalDateTime;
import java.util.List;

public class EventDTO {
    private int eventId;
    private String title;
    private LocalDateTime eventDate;
    private String description;
    private String imagepath;
    private ParishDTO parish;
    private CategoryDTO category;
    private List<EventDetailDTO> eventDetails;

    // Constructors
    public EventDTO() {
    }

    public EventDTO(int eventId, String title, LocalDateTime eventDate, String description, String imagepath, ParishDTO parish, CategoryDTO category, List<EventDetailDTO> eventDetails) {
        this.eventId = eventId;
        this.title = title;
        this.eventDate = eventDate;
        this.description = description;
        this.imagepath = imagepath;
        this.parish = parish;
        this.category = category;
        this.eventDetails = eventDetails;
    }

    // Getters and Setters
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

    public ParishDTO getParish() {
        return parish;
    }

    public void setParish(ParishDTO parish) {
        this.parish = parish;
    }

    public CategoryDTO getCategory() {
        return category;
    }

    public void setCategory(CategoryDTO category) {
        this.category = category;
    }

    public List<EventDetailDTO> getEventDetails() {
        return eventDetails;
    }

    public void setEventDetails(List<EventDetailDTO> eventDetails) {
        this.eventDetails = eventDetails;
    }
}