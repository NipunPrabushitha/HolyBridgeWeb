package lk.ijse.holybridge.service;

import lk.ijse.holybridge.dto.DuesDTO;
import java.util.List;

public interface DuesService {
    int saveDues(DuesDTO duesDTO);
    int updateDues(DuesDTO duesDTO);
    int deleteDues(int id);
    List<DuesDTO> getAllDues();
    DuesDTO getDuesById(int id);
    List<DuesDTO> getDuesByMember(int memberId);
}