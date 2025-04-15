package lk.ijse.holybridge.service.impl;

import lk.ijse.holybridge.dto.OrphanDTO;
import lk.ijse.holybridge.dto.ParishDTO;
import lk.ijse.holybridge.entity.Orphan;
import lk.ijse.holybridge.entity.Parish;
import lk.ijse.holybridge.repo.OrphanRepository;
import lk.ijse.holybridge.repo.ParishRepository;
import lk.ijse.holybridge.service.OrphanService;
import lk.ijse.holybridge.util.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class OrphanServiceImpl implements OrphanService {

    private final OrphanRepository orphanRepository;
    private final ParishRepository parishRepository;

    @Autowired
    public OrphanServiceImpl(OrphanRepository orphanRepository, ParishRepository parishRepository) {
        this.orphanRepository = orphanRepository;
        this.parishRepository = parishRepository;
    }

    @Override
    public int saveOrphan(OrphanDTO orphanDTO) {
        Optional<Parish> parish = parishRepository.findById(orphanDTO.getParishDTO().getParishId());
        if (!parish.isPresent()) {
            return VarList.Not_Found;
        }

        Orphan orphan = new Orphan();
        orphan.setName(orphanDTO.getName());
        orphan.setImagepath(orphanDTO.getImagepath());
        orphan.setDateOfBirth(orphanDTO.getDateOfBirth());
        orphan.setGender(orphanDTO.getGender());
        orphan.setParish(parish.get());

        orphanRepository.save(orphan);
        return VarList.Created;
    }

    @Override
    public int updateOrphan(OrphanDTO orphanDTO) {
        Optional<Orphan> optionalOrphan = orphanRepository.findById(orphanDTO.getOrphanId());
        if (!optionalOrphan.isPresent()) {
            return VarList.Not_Found;
        }

        Orphan orphan = optionalOrphan.get();
        orphan.setName(orphanDTO.getName());
        orphan.setImagepath(orphanDTO.getImagepath());
        orphan.setDateOfBirth(orphanDTO.getDateOfBirth());
        orphan.setGender(orphanDTO.getGender());

        if (orphanDTO.getParishDTO() != null) {
            Optional<Parish> parish = parishRepository.findById(orphanDTO.getParishDTO().getParishId());
            if (!parish.isPresent()) {
                return VarList.Not_Found;
            }
            orphan.setParish(parish.get());
        }

        orphanRepository.save(orphan);
        return VarList.OK;
    }

    @Override
    public int deleteOrphan(int id) {
        if (!orphanRepository.existsById(id)) {
            return VarList.Not_Found;
        }
        orphanRepository.deleteById(id);
        return VarList.OK;
    }

    @Override
    public List<OrphanDTO> getAllOrphans() {
        return orphanRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public OrphanDTO getOrphanById(int id) {
        Optional<Orphan> orphan = orphanRepository.findById(id);
        return orphan.map(this::convertToDTO).orElse(null);
    }

    @Override
    public List<OrphanDTO> getOrphansByParish(int parishId) {
        return orphanRepository.findByParish_ParishId(parishId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private OrphanDTO convertToDTO(Orphan orphan) {
        OrphanDTO dto = new OrphanDTO();
        dto.setOrphanId(orphan.getOrphanId());
        dto.setName(orphan.getName());
        dto.setImagepath(orphan.getImagepath());
        dto.setDateOfBirth(orphan.getDateOfBirth());
        dto.setGender(orphan.getGender());

        Parish parish = orphan.getParish();
        ParishDTO parishDTO = new ParishDTO();
        parishDTO.setParishId(parish.getParishId());
        parishDTO.setName(parish.getName());
        // Add other parish fields if needed

        dto.setParishDTO(parishDTO);
        return dto;
    }
}