package lk.ijse.holybridge.dto;

import jakarta.persistence.*;
import lk.ijse.holybridge.entity.Category;
import lk.ijse.holybridge.entity.Event;
import lk.ijse.holybridge.entity.Parish;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class EventDTO {
    private int eventId;

    private String title;

    private LocalDateTime eventDate;

    private String description;

    private String imagepath;

    private ParishDTO parishDTO;
    private CategoryDTO categoryDTO;
}
