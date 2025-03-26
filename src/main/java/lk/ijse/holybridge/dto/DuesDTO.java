package lk.ijse.holybridge.dto;

import lk.ijse.holybridge.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class DuesDTO {
    private double amount;
    private LocalDate dueDate;
    private Member member;
}
