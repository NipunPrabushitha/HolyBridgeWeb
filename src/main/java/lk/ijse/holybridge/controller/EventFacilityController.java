package lk.ijse.holybridge.controller;

import lk.ijse.holybridge.dto.EventFacilityDTO;
import lk.ijse.holybridge.dto.ResponseDTO;
import lk.ijse.holybridge.service.EventFacilityService;
import lk.ijse.holybridge.util.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("api/v1/event-facility")
public class EventFacilityController {

    @Autowired
    private EventFacilityService eventFacilityService;

    @Autowired
    private ResponseDTO responseDTO;

    @PostMapping(value = "/save")
    public ResponseEntity<ResponseDTO> saveEventFacility(@RequestBody EventFacilityDTO eventFacilityDTO) {
        try {
            int res = eventFacilityService.saveEventFacility(eventFacilityDTO);
            switch (res) {
                case VarList.Created -> {
                    responseDTO.setCode(VarList.Created);
                    responseDTO.setMessage("Success");
                    responseDTO.setData(eventFacilityDTO);
                    return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
                }
                case VarList.Not_Acceptable -> {
                    responseDTO.setCode(VarList.Not_Acceptable);
                    responseDTO.setMessage("Event Facility Already Exists");
                    responseDTO.setData(null);
                    return new ResponseEntity<>(responseDTO, HttpStatus.NOT_ACCEPTABLE);
                }
                default -> {
                    responseDTO.setCode(VarList.Bad_Gateway);
                    responseDTO.setMessage("Error");
                    responseDTO.setData(null);
                    return new ResponseEntity<>(responseDTO, HttpStatus.BAD_GATEWAY);
                }
            }
        } catch (Exception e) {
            responseDTO.setCode(VarList.Internal_Server_Error);
            responseDTO.setMessage(e.getMessage());
            responseDTO.setData(null);
            return new ResponseEntity<>(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value = "/update")
    public ResponseEntity<ResponseDTO> updateEventFacility(@RequestBody EventFacilityDTO eventFacilityDTO) {
        try {
            int res = eventFacilityService.updateEventFacility(eventFacilityDTO);
            switch (res) {
                case VarList.Created -> {
                    responseDTO.setCode(VarList.Created);
                    responseDTO.setMessage("Success");
                    responseDTO.setData(eventFacilityDTO);
                    return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
                }
                case VarList.Not_Acceptable -> {
                    responseDTO.setCode(VarList.Not_Acceptable);
                    responseDTO.setMessage("Event Facility Not Found");
                    responseDTO.setData(null);
                    return new ResponseEntity<>(responseDTO, HttpStatus.NOT_ACCEPTABLE);
                }
                default -> {
                    responseDTO.setCode(VarList.Bad_Gateway);
                    responseDTO.setMessage("Error");
                    responseDTO.setData(null);
                    return new ResponseEntity<>(responseDTO, HttpStatus.BAD_GATEWAY);
                }
            }
        } catch (Exception e) {
            responseDTO.setCode(VarList.Internal_Server_Error);
            responseDTO.setMessage(e.getMessage());
            responseDTO.setData(null);
            return new ResponseEntity<>(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<ResponseDTO> deleteEventFacility(@PathVariable int id) {
        try {
            int res = eventFacilityService.deleteEventFacility(id);
            switch (res) {
                case VarList.Created -> {
                    responseDTO.setCode(VarList.Created);
                    responseDTO.setMessage("Success");
                    responseDTO.setData(null);
                    return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
                }
                case VarList.Not_Acceptable -> {
                    responseDTO.setCode(VarList.Not_Acceptable);
                    responseDTO.setMessage("Event Facility Not Found");
                    responseDTO.setData(null);
                    return new ResponseEntity<>(responseDTO, HttpStatus.NOT_ACCEPTABLE);
                }
                default -> {
                    responseDTO.setCode(VarList.Bad_Gateway);
                    responseDTO.setMessage("Error");
                    responseDTO.setData(null);
                    return new ResponseEntity<>(responseDTO, HttpStatus.BAD_GATEWAY);
                }
            }
        } catch (Exception e) {
            responseDTO.setCode(VarList.Internal_Server_Error);
            responseDTO.setMessage(e.getMessage());
            responseDTO.setData(null);
            return new ResponseEntity<>(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/get-all")
    public ResponseEntity<ResponseDTO> getAllEventFacilities() {
        try {
            List<EventFacilityDTO> eventFacilityDTOList = eventFacilityService.getAllEventFacilities();
            responseDTO.setCode(VarList.Created);
            responseDTO.setMessage("Success");
            responseDTO.setData(eventFacilityDTOList);
            return new ResponseEntity<>(responseDTO, HttpStatus.OK);
        } catch (Exception e) {
            responseDTO.setCode(VarList.Internal_Server_Error);
            responseDTO.setMessage(e.getMessage());
            responseDTO.setData(null);
            return new ResponseEntity<>(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/search/{id}")
    public ResponseEntity<ResponseDTO> searchEventFacility(@PathVariable int id) {
        try {
            EventFacilityDTO eventFacilityDTO = eventFacilityService.searchEventFacility(id);
            if (eventFacilityDTO != null) {
                responseDTO.setCode(VarList.Created);
                responseDTO.setMessage("Success");
                responseDTO.setData(eventFacilityDTO);
                return new ResponseEntity<>(responseDTO, HttpStatus.OK);
            } else {
                responseDTO.setCode(VarList.Not_Acceptable);
                responseDTO.setMessage("Event Facility Not Found");
                responseDTO.setData(null);
                return new ResponseEntity<>(responseDTO, HttpStatus.NOT_ACCEPTABLE);
            }
        } catch (Exception e) {
            responseDTO.setCode(VarList.Internal_Server_Error);
            responseDTO.setMessage(e.getMessage());
            responseDTO.setData(null);
            return new ResponseEntity<>(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}