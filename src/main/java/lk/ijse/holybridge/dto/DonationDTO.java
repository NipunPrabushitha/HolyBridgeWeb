package lk.ijse.holybridge.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class DonationDTO {
    private Double amount;
    private LocalDate date;
    private String note;
    private UserDTO userDTO;
}
