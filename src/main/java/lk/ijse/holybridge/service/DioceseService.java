package lk.ijse.holybridge.service;

import lk.ijse.holybridge.dto.DioceseDTO;
import java.util.List;
import java.util.Optional;

public interface DioceseService {
    int saveDiocese(DioceseDTO dioceseDTO);
    int updateDiocese(DioceseDTO dioceseDTO);
    int deleteDiocese(int id);
    List<DioceseDTO> getAllDioceses();
    Optional<DioceseDTO> getDioceseById(int id); // Add this method
}