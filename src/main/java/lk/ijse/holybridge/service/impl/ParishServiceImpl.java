package lk.ijse.holybridge.service.impl;

import lk.ijse.holybridge.dto.DioceseDTO;
import lk.ijse.holybridge.dto.ParishDTO;
import lk.ijse.holybridge.entity.Diocese;
import lk.ijse.holybridge.entity.Parish;
import lk.ijse.holybridge.repo.DioceseRepository;
import lk.ijse.holybridge.repo.ParishRepository;
import lk.ijse.holybridge.service.ParishService;
import lk.ijse.holybridge.util.VarList;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class ParishServiceImpl implements ParishService {

    private final ParishRepository parishRepository;
    private final DioceseRepository dioceseRepository;

    public ParishServiceImpl(ParishRepository parishRepository, DioceseRepository dioceseRepository) {
        this.parishRepository = parishRepository;
        this.dioceseRepository = dioceseRepository;
    }

    @Override
    public int saveParish(ParishDTO parishDTO) {
        if (parishRepository.existsByName(parishDTO.getName())) {
            return VarList.Not_Acceptable;
        }

        Optional<Diocese> diocese = dioceseRepository.findById(parishDTO.getDioceseDTO().getId());
        if (!diocese.isPresent()) {
            return VarList.Not_Found;
        }

        Parish parish = new Parish();
        parish.setName(parishDTO.getName());
        parish.setDescription(parishDTO.getDescription());
        parish.setAddress(parishDTO.getAddress());
        parish.setFartherName(parishDTO.getFartherName());
        parish.setDiocese(diocese.get());

        parishRepository.save(parish);
        return VarList.Created;
    }

    @Override
    public int updateParish(ParishDTO parishDTO) {
        Optional<Parish> existingParish = parishRepository.findById(parishDTO.getParishId());
        if (!existingParish.isPresent()) {
            return VarList.Not_Found;
        }

        Parish parish = existingParish.get();
        parish.setName(parishDTO.getName());
        parish.setDescription(parishDTO.getDescription());
        parish.setAddress(parishDTO.getAddress());
        parish.setFartherName(parishDTO.getFartherName());

        if (parishDTO.getDioceseDTO() != null) {
            Optional<Diocese> diocese = dioceseRepository.findById(parishDTO.getDioceseDTO().getId());
            if (diocese.isPresent()) {
                parish.setDiocese(diocese.get());
            }
        }

        parishRepository.save(parish);
        return VarList.OK;
    }

    @Override
    public int deleteParish(int id) {
        if (!parishRepository.existsById(id)) {
            return VarList.Not_Found;
        }
        parishRepository.deleteById(id);
        return VarList.OK;
    }

    @Override
    public List<ParishDTO> getAllParishes() {
        return parishRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ParishDTO getParishById(int id) {
        Optional<Parish> parish = parishRepository.findById(id);
        return parish.map(this::convertToDTO).orElse(null);
    }

    private ParishDTO convertToDTO(Parish parish) {
        ParishDTO dto = new ParishDTO();
        dto.setParishId(parish.getParishId());
        dto.setName(parish.getName());
        dto.setDescription(parish.getDescription());
        dto.setAddress(parish.getAddress());
        dto.setFartherName(parish.getFartherName());

        Diocese diocese = parish.getDiocese();
        DioceseDTO dioceseDTO = new DioceseDTO();
        dioceseDTO.setId(diocese.getUid());
        dioceseDTO.setName(diocese.getName());
        dioceseDTO.setDescription(diocese.getDescription());
        dioceseDTO.setAddress(diocese.getAddress());
        dioceseDTO.setBishopName(diocese.getBishopName());

        dto.setDioceseDTO(dioceseDTO);
        return dto;
    }
}