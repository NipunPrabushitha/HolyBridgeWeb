package lk.ijse.holybridge.service;

import lk.ijse.holybridge.dto.OrphanDTO;
import java.util.List;

public interface OrphanService {
    int saveOrphan(OrphanDTO orphanDTO);
    int updateOrphan(OrphanDTO orphanDTO);
    int deleteOrphan(int id);
    List<OrphanDTO> getAllOrphans();
    OrphanDTO getOrphanById(int id);
    List<OrphanDTO> getOrphansByParish(int parishId);
}