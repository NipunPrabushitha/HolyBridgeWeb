package lk.ijse.holybridge.controller;

import jakarta.validation.Valid;
import lk.ijse.holybridge.dto.MemberDTO;
import lk.ijse.holybridge.dto.ResponseDTO;
import lk.ijse.holybridge.service.MemberService;
import lk.ijse.holybridge.util.VarList;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("api/v1/member")
public class MemberController {
    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping("/save")
    public ResponseEntity<ResponseDTO> saveMember(@RequestBody @Valid MemberDTO memberDTO) {
        int res = memberService.saveMember(memberDTO);
        if (res == VarList.Created) {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ResponseDTO(VarList.Created, "Member Created Successfully", null));
        } else if (res == VarList.Not_Acceptable) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE)
                    .body(new ResponseDTO(VarList.Not_Acceptable, "Member Already Exists", null));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseDTO(VarList.Bad_Request, "Error Occurred", null));
        }
    }

    @PutMapping("/update")
    public ResponseEntity<ResponseDTO> updateMember(@RequestBody @Valid MemberDTO memberDTO) {
        int res = memberService.updateMember(memberDTO);
        if (res == VarList.OK) {
            return ResponseEntity.ok(new ResponseDTO(VarList.OK, "Member Updated Successfully", null));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseDTO(VarList.Not_Found, "Member Not Found", null));
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ResponseDTO> deleteMember(@PathVariable int id) {
        int res = memberService.deleteMember(id);
        if (res == VarList.OK) {
            return ResponseEntity.ok(new ResponseDTO(VarList.OK, "Member Deleted Successfully", null));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseDTO(VarList.Not_Found, "Member Not Found", null));
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<MemberDTO>> getAllMembers() {
        return ResponseEntity.ok(memberService.getAllMembers());
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<MemberDTO> getMemberById(@PathVariable int id) {
        MemberDTO memberDTO = memberService.getMemberById(id);
        if (memberDTO != null) {
            return ResponseEntity.ok(memberDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}