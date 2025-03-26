package lk.ijse.holybridge.service;

import lk.ijse.holybridge.dto.EventFacilityDTO;

import java.util.List;

public interface EventFacilityService {
    int saveEventFacility(EventFacilityDTO eventFacilityDTO);
    int updateEventFacility(EventFacilityDTO eventFacilityDTO);
    int deleteEventFacility(int id);
    List<EventFacilityDTO> getAllEventFacilities();
    EventFacilityDTO searchEventFacility(int id);
}