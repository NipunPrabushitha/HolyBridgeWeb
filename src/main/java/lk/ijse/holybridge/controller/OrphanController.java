package lk.ijse.holybridge.controller;

import jakarta.validation.Valid;
import lk.ijse.holybridge.dto.OrphanDTO;
import lk.ijse.holybridge.dto.ResponseDTO;
import lk.ijse.holybridge.service.OrphanService;
import lk.ijse.holybridge.util.VarList;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("api/v1/orphan")
public class OrphanController {
    private final OrphanService orphanService;

    public OrphanController(OrphanService orphanService) {
        this.orphanService = orphanService;
    }

    @PostMapping("/save")
    public ResponseEntity<ResponseDTO> saveOrphan(@RequestBody @Valid OrphanDTO orphanDTO) {
        int res = orphanService.saveOrphan(orphanDTO);
        if (res == VarList.Created) {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ResponseDTO(VarList.Created, "Orphan Created Successfully", null));
        } else if (res == VarList.Not_Acceptable) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE)
                    .body(new ResponseDTO(VarList.Not_Acceptable, "Orphan Already Exists", null));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseDTO(VarList.Bad_Request, "Error Occurred", null));
        }
    }

    @PutMapping("/update")
    public ResponseEntity<ResponseDTO> updateOrphan(@RequestBody @Valid OrphanDTO orphanDTO) {
        int res = orphanService.updateOrphan(orphanDTO);
        if (res == VarList.OK) {
            return ResponseEntity.ok(new ResponseDTO(VarList.OK, "Orphan Updated Successfully", null));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseDTO(VarList.Not_Found, "Orphan Not Found", null));
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ResponseDTO> deleteOrphan(@PathVariable int id) {
        int res = orphanService.deleteOrphan(id);
        if (res == VarList.OK) {
            return ResponseEntity.ok(new ResponseDTO(VarList.OK, "Orphan Deleted Successfully", null));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseDTO(VarList.Not_Found, "Orphan Not Found", null));
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<OrphanDTO>> getAllOrphans() {
        return ResponseEntity.ok(orphanService.getAllOrphans());
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<OrphanDTO> getOrphanById(@PathVariable int id) {
        OrphanDTO orphanDTO = orphanService.getOrphanById(id);
        if (orphanDTO != null) {
            return ResponseEntity.ok(orphanDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/getByParish/{parishId}")
    public ResponseEntity<List<OrphanDTO>> getOrphansByParish(@PathVariable int parishId) {
        List<OrphanDTO> orphans = orphanService.getOrphansByParish(parishId);
        if (!orphans.isEmpty()) {
            return ResponseEntity.ok(orphans);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}