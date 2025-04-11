package lk.ijse.holybridge.service;

import lk.ijse.holybridge.dto.ParishDTO;
import java.util.List;

public interface ParishService {
    int saveParish(ParishDTO parishDTO);
    int updateParish(ParishDTO parishDTO);
    int deleteParish(int id);
    List<ParishDTO> getAllParishes();
    ParishDTO getParishById(int id);
}