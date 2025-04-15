package lk.ijse.holybridge.controller;

import jakarta.validation.Valid;
import lk.ijse.holybridge.dto.DuesDTO;
import lk.ijse.holybridge.dto.ResponseDTO;
import lk.ijse.holybridge.service.DuesService;
import lk.ijse.holybridge.util.VarList;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("api/v1/dues")
public class DuesController {
    private final DuesService duesService;

    public DuesController(DuesService duesService) {
        this.duesService = duesService;
    }

    @PostMapping("/save")
    public ResponseEntity<ResponseDTO> saveDues(@RequestBody @Valid DuesDTO duesDTO) {
        int res = duesService.saveDues(duesDTO);
        if (res == VarList.Created) {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ResponseDTO(VarList.Created, "Dues Created Successfully", null));
        } else if (res == VarList.Not_Found) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseDTO(VarList.Not_Found, "Member Not Found", null));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseDTO(VarList.Bad_Request, "Error Occurred", null));
        }
    }

    @PutMapping("/update")
    public ResponseEntity<ResponseDTO> updateDues(@RequestBody @Valid DuesDTO duesDTO) {
        int res = duesService.updateDues(duesDTO);
        if (res == VarList.OK) {
            return ResponseEntity.ok(new ResponseDTO(VarList.OK, "Dues Updated Successfully", null));
        } else if (res == VarList.Not_Found) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseDTO(VarList.Not_Found, "Dues or Member Not Found", null));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseDTO(VarList.Bad_Request, "Error Occurred", null));
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ResponseDTO> deleteDues(@PathVariable int id) {
        int res = duesService.deleteDues(id);
        if (res == VarList.OK) {
            return ResponseEntity.ok(new ResponseDTO(VarList.OK, "Dues Deleted Successfully", null));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseDTO(VarList.Not_Found, "Dues Not Found", null));
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<DuesDTO>> getAllDues() {
        return ResponseEntity.ok(duesService.getAllDues());
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<DuesDTO> getDuesById(@PathVariable int id) {
        DuesDTO duesDTO = duesService.getDuesById(id);
        if (duesDTO != null) {
            return ResponseEntity.ok(duesDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/getByMember/{memberId}")
    public ResponseEntity<List<DuesDTO>> getDuesByMember(@PathVariable int memberId) {
        List<DuesDTO> duesList = duesService.getDuesByMember(memberId);
        if (!duesList.isEmpty()) {
            return ResponseEntity.ok(duesList);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}