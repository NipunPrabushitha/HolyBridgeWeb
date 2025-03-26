package lk.ijse.holybridge.service.impl;

import lk.ijse.holybridge.dto.DioceseDTO;
import lk.ijse.holybridge.dto.MinistryDTO;
import lk.ijse.holybridge.entity.Diocese;
import lk.ijse.holybridge.entity.Ministry;
import lk.ijse.holybridge.entity.User;
import lk.ijse.holybridge.repo.DioceseRepository;
import lk.ijse.holybridge.service.DioceseService;
import lk.ijse.holybridge.util.VarList;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DioceseServiceImpl implements DioceseService {
    private final DioceseRepository dioceseRepository;
    @Autowired
    private ModelMapper modelMapper;

    public DioceseServiceImpl(DioceseRepository dioceseRepository) {
        this.dioceseRepository = dioceseRepository;
    }

    @Override
    public int saveDiocese(DioceseDTO dioceseDTO) {
        if (dioceseRepository.existsByName(dioceseDTO.getName())) {
            return VarList.Not_Acceptable;
        }

        Diocese diocese = new Diocese(
                dioceseDTO.getId(),
                dioceseDTO.getName(),
                dioceseDTO.getDescription(),
                dioceseDTO.getAddress(),
                dioceseDTO.getBishopName(),
                // Assuming you're passing a MinistryDTO and you want to map it correctly
                new Ministry(
                        dioceseDTO.getMinistry().getId(),
                        dioceseDTO.getMinistry().getMinistryName(),
                        dioceseDTO.getMinistry().getDescription(),
                        dioceseDTO.getMinistry().getAddress()
                )
        );
        System.out.println(dioceseDTO.getMinistry().getId());
        System.out.println(dioceseDTO.getMinistry().getMinistryName());
        System.out.println(dioceseDTO.getMinistry().getDescription());
        System.out.println(dioceseDTO.getMinistry().getAddress());
        /*diocese.setName(dioceseDTO.getName());
        diocese.setDescription(dioceseDTO.getDescription());
        diocese.setAddress(dioceseDTO.getAddress());
        diocese.setBishopName(dioceseDTO.getBishopName());

        // Assuming you're passing a MinistryDTO and you want to map it correctly
        Ministry ministry = new Ministry();
        ministry.setMinistry_id(dioceseDTO.getMinistry().getId());
        ministry.setName(dioceseDTO.getMinistry().getMinistryName());
        ministry.setDescription(dioceseDTO.getMinistry().getDescription());
        ministry.setAddress(dioceseDTO.getMinistry().getAddress());

        diocese.setMinistry(ministry);*/ // Set the ministry for the diocese

        dioceseRepository.save(diocese);
        /*dioceseRepository.save(modelMapper.map(dioceseDTO, Diocese.class));*/
        return VarList.Created;
    }


    @Override
    public int updateDiocese(DioceseDTO dioceseDTO) {
        Optional<Diocese> optionalDiocese = dioceseRepository.findByName(dioceseDTO.getName());
        if (optionalDiocese.isPresent()) {
            Diocese diocese = optionalDiocese.get();
            diocese.setDescription(dioceseDTO.getDescription());
            diocese.setAddress(dioceseDTO.getAddress());
            diocese.setBishopName(dioceseDTO.getBishopName());
            dioceseRepository.save(diocese);
            return VarList.OK;
        }
        return VarList.Not_Found;
    }


    @Override
    public int deleteDiocese(int id) {
        if (dioceseRepository.existsById(id)) {
            dioceseRepository.deleteById(id);
            return VarList.OK;
        }
        return VarList.Not_Found;
    }

    @Override
    public List<DioceseDTO> getAllDioceses() {
        return dioceseRepository.findAll().stream().map(diocese -> new DioceseDTO(
                diocese.getUid(),
                diocese.getName(),
                diocese.getDescription(),
                diocese.getAddress(),
                diocese.getBishopName(),
                new MinistryDTO(  // Use MinistryDTO here
                        diocese.getMinistry().getName(),
                        diocese.getMinistry().getDescription(),
                        diocese.getMinistry().getAddress()
                )
        )).collect(Collectors.toList());
    }
}
