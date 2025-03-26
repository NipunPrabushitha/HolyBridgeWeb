package lk.ijse.holybridge.controller;

import jakarta.validation.Valid;
import lk.ijse.holybridge.dto.DioceseDTO;
import lk.ijse.holybridge.dto.ResponseDTO;
import lk.ijse.holybridge.service.DioceseService;
import lk.ijse.holybridge.util.VarList;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("api/v1/diocese")
public class DioceseController {
    private final DioceseService dioceseService;

    public DioceseController(DioceseService dioceseService) {
        this.dioceseService = dioceseService;
    }

    @PostMapping("/save")
    public ResponseEntity<ResponseDTO> saveDiocese(@RequestBody @Valid DioceseDTO dioceseDTO) {
        int res = dioceseService.saveDiocese(dioceseDTO);
        if (res == VarList.Created) {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ResponseDTO(VarList.Created, "Diocese Created Successfully", null));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE)
                    .body(new ResponseDTO(VarList.Not_Acceptable, "Diocese Already Exists", null));
        }
    }

    @PutMapping("/update")
    public ResponseEntity<ResponseDTO> updateDiocese(@RequestBody @Valid DioceseDTO dioceseDTO) {
        int res = dioceseService.updateDiocese(dioceseDTO);
        if (res == VarList.OK) {
            return ResponseEntity.ok(new ResponseDTO(VarList.OK, "Diocese Updated Successfully", null));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseDTO(VarList.Not_Found, "Diocese Not Found", null));
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ResponseDTO> deleteDiocese(@PathVariable int id) {
        int res = dioceseService.deleteDiocese(id);
        if (res == VarList.OK) {
            return ResponseEntity.ok(new ResponseDTO(VarList.OK, "Diocese Deleted Successfully", null));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseDTO(VarList.Not_Found, "Diocese Not Found", null));
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<DioceseDTO>> getAllDioceses() {
        return ResponseEntity.ok(dioceseService.getAllDioceses());
    }
}
