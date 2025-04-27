package lk.ijse.holybridge.service.impl;

import lk.ijse.holybridge.dto.EventDTO;
import lk.ijse.holybridge.dto.EventDetailDTO;
import lk.ijse.holybridge.entity.*;
import lk.ijse.holybridge.repo.*;
import lk.ijse.holybridge.service.EventService;
import lk.ijse.holybridge.util.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EventServiceImpl implements EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private ParishRepository parishRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private EventFacilityRepository eventFacilityRepository;

    @Autowired
    private EventDetailRepository eventDetailRepository;

    @Override
    public int generateNextEventId() {
        Integer maxEventId = eventRepository.findMaxEventId();
        return (maxEventId != null ? maxEventId : 0) + 1;
    }

    @Transactional
    @Override
    public int saveEvent(EventDTO eventDTO) {
        if (eventRepository.existsById(eventDTO.getEventId())) {
            return VarList.Not_Acceptable;
        }

        Parish parish = parishRepository.findById(eventDTO.getParish().getParishId())
                .orElse(null);
        if (parish == null) {
            return VarList.Not_Found;
        }

        Category category = categoryRepository.findById(eventDTO.getCategory().getId())
                .orElse(null);
        if (category == null) {
            return VarList.Not_Found;
        }

        Event event = new Event();
        event.setEventId(eventDTO.getEventId());
        event.setTitle(eventDTO.getTitle());
        event.setEventDate(eventDTO.getEventDate());
        event.setDescription(eventDTO.getDescription());
        event.setImagepath(eventDTO.getImagepath());
        event.setParish(parish);
        event.setCategory(category);

        eventRepository.save(event);

        // Save event details
        for (EventDetailDTO detailDTO : eventDTO.getEventDetails()) {
            EventFacility facility = eventFacilityRepository.findById(detailDTO.getEventFacility().getFacilityId())
                    .orElse(null);
            if (facility == null || !facility.getAvailable()) {
                return VarList.Not_Acceptable;
            }

            EventDetail eventDetail = new EventDetail();
            eventDetail.setQuantity(detailDTO.getQuantity());
            eventDetail.setEventFacility(facility);
            eventDetail.setEvent(event);
            eventDetailRepository.save(eventDetail);
        }

        return VarList.Created;
    }
}