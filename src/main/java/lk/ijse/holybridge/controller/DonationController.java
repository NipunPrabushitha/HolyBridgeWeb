package lk.ijse.holybridge.controller;

import jakarta.validation.Valid;
import lk.ijse.holybridge.dto.DonationDTO;
import lk.ijse.holybridge.dto.ResponseDTO;
import lk.ijse.holybridge.service.DonationService;
import lk.ijse.holybridge.util.VarList;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("api/v1/donation")
public class DonationController {
    private final DonationService donationService;

    public DonationController(DonationService donationService) {
        this.donationService = donationService;
    }

    @PostMapping("/save")
    public ResponseEntity<ResponseDTO> saveDonation(@RequestBody @Valid DonationDTO donationDTO) {
        int res = donationService.saveDonation(donationDTO);
        if (res == VarList.Created) {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ResponseDTO(VarList.Created, "Donation Created Successfully", null));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseDTO(VarList.Bad_Request, "Error Occurred", null));
        }
    }

    @PutMapping("/update")
    public ResponseEntity<ResponseDTO> updateDonation(@RequestBody @Valid DonationDTO donationDTO) {
        int res = donationService.updateDonation(donationDTO);
        if (res == VarList.OK) {
            return ResponseEntity.ok(new ResponseDTO(VarList.OK, "Donation Updated Successfully", null));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseDTO(VarList.Not_Found, "Donation Not Found", null));
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ResponseDTO> deleteDonation(@PathVariable int id) {
        int res = donationService.deleteDonation(id);
        if (res == VarList.OK) {
            return ResponseEntity.ok(new ResponseDTO(VarList.OK, "Donation Deleted Successfully", null));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseDTO(VarList.Not_Found, "Donation Not Found", null));
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<DonationDTO>> getAllDonations() {
        return ResponseEntity.ok(donationService.getAllDonations());
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<DonationDTO> getDonationById(@PathVariable int id) {
        DonationDTO donationDTO = donationService.getDonationById(id);
        if (donationDTO != null) {
            return ResponseEntity.ok(donationDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<DonationDTO>> getDonationsByUserId(@PathVariable int userId) {
        List<DonationDTO> donations = donationService.getDonationsByUserId(userId);
        return ResponseEntity.ok(donations);
    }
}