package lk.ijse.holybridge.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ParishDTO {
    private String name;
    private String description;
    private String address;
    private String fartherName;
    private DioceseDTO dioceseDTO;
}
