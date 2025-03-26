package lk.ijse.holybridge.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class MemberDTO {

    private String name;
    private String address;
    private String contactNumber;
    private String gender;
    private String imagepath;
    private LocalDate dateOfBirth;
    private ParishDTO parishDTO;

}
