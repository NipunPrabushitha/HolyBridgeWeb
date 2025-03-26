package lk.ijse.holybridge.dto;

import lk.ijse.holybridge.entity.Parish;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrphanDTO {

    private String name;
    private String imagepath;
    private LocalDate dateOfBirth;
    private String gender;
    private Parish parish;

}
