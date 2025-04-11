package lk.ijse.holybridge.controller;

import jakarta.validation.Valid;
import lk.ijse.holybridge.dto.ParishDTO;
import lk.ijse.holybridge.dto.ResponseDTO;
import lk.ijse.holybridge.service.ParishService;
import lk.ijse.holybridge.util.VarList;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("api/v1/parish")
public class ParishController {
    private final ParishService parishService;

    public ParishController(ParishService parishService) {
        this.parishService = parishService;
    }

    @PostMapping("/save")
    public ResponseEntity<ResponseDTO> saveParish(@RequestBody @Valid ParishDTO parishDTO) {
        int res = parishService.saveParish(parishDTO);
        if (res == VarList.Created) {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ResponseDTO(VarList.Created, "Parish Created Successfully", null));
        } else if (res == VarList.Not_Acceptable) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE)
                    .body(new ResponseDTO(VarList.Not_Acceptable, "Parish Already Exists", null));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseDTO(VarList.Bad_Request, "Error Occurred", null));
        }
    }

    @PutMapping("/update")
    public ResponseEntity<ResponseDTO> updateParish(@RequestBody @Valid ParishDTO parishDTO) {
        int res = parishService.updateParish(parishDTO);
        if (res == VarList.OK) {
            return ResponseEntity.ok(new ResponseDTO(VarList.OK, "Parish Updated Successfully", null));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseDTO(VarList.Not_Found, "Parish Not Found", null));
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ResponseDTO> deleteParish(@PathVariable int id) {
        int res = parishService.deleteParish(id);
        if (res == VarList.OK) {
            return ResponseEntity.ok(new ResponseDTO(VarList.OK, "Parish Deleted Successfully", null));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseDTO(VarList.Not_Found, "Parish Not Found", null));
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<ParishDTO>> getAllParishes() {
        return ResponseEntity.ok(parishService.getAllParishes());
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<ParishDTO> getParishById(@PathVariable int id) {
        ParishDTO parishDTO = parishService.getParishById(id);
        if (parishDTO != null) {
            return ResponseEntity.ok(parishDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}