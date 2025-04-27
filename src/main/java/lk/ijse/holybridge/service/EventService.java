package lk.ijse.holybridge.service;

import lk.ijse.holybridge.dto.EventDTO;

import java.util.List;

public interface EventService {
    int generateNextEventId();
    int saveEvent(EventDTO eventDTO);
}