package lk.ijse.holybridge.service.impl;

import lk.ijse.holybridge.dto.EventFacilityDTO;
import lk.ijse.holybridge.entity.EventFacility;
import lk.ijse.holybridge.repo.EventFacilityRepository;
import lk.ijse.holybridge.service.EventFacilityService;
import lk.ijse.holybridge.util.VarList;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class EventFacilityServiceImpl implements EventFacilityService {

    @Autowired
    private EventFacilityRepository eventFacilityRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public int saveEventFacility(EventFacilityDTO eventFacilityDTO) {
        if (eventFacilityDTO.getAvailable() == null) {
            eventFacilityDTO.setAvailable(true); // Set default value if null
        }
        if (eventFacilityRepository.existsById(eventFacilityDTO.getFacilityId())) {
            return VarList.Not_Acceptable;
        } else {
            eventFacilityRepository.save(modelMapper.map(eventFacilityDTO, EventFacility.class));
            return VarList.Created;
        }
    }

    @Override
    public int updateEventFacility(EventFacilityDTO eventFacilityDTO) {
        if (eventFacilityDTO.getAvailable() == null) {
            eventFacilityDTO.setAvailable(true); // Set default value if null
        }
        if (eventFacilityRepository.existsById(eventFacilityDTO.getFacilityId())) {
            eventFacilityRepository.save(modelMapper.map(eventFacilityDTO, EventFacility.class));
            return VarList.Created;
        } else {
            return VarList.Not_Acceptable;
        }
    }

    @Override
    public int deleteEventFacility(int id) {
        if (eventFacilityRepository.existsById(id)) {
            eventFacilityRepository.deleteById(id);
            return VarList.Created;
        } else {
            return VarList.Not_Acceptable;
        }
    }

    @Override
    public List<EventFacilityDTO> getAllEventFacilities() {
        return eventFacilityRepository.findAll().stream()
                .map(eventFacility -> modelMapper.map(eventFacility, EventFacilityDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public EventFacilityDTO searchEventFacility(int id) {
        if (eventFacilityRepository.existsById(id)) {
            EventFacility eventFacility = eventFacilityRepository.findById(id).orElse(null);
            return modelMapper.map(eventFacility, EventFacilityDTO.class);
        } else {
            return null;
        }
    }
}