package lk.ijse.holybridge.service.impl;

import lk.ijse.holybridge.dto.DonationDTO;
import lk.ijse.holybridge.dto.UserDTO;
import lk.ijse.holybridge.entity.Donation;
import lk.ijse.holybridge.entity.User;
import lk.ijse.holybridge.repo.DonationRepository;
import lk.ijse.holybridge.repo.UserRepository;
import lk.ijse.holybridge.service.DonationService;
import lk.ijse.holybridge.util.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class DonationServiceImpl implements DonationService {

    @Autowired
    private DonationRepository donationRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public int saveDonation(DonationDTO donationDTO) {
        Optional<User> user = userRepository.findById(donationDTO.getUserDTO().getUid());
        if (!user.isPresent()) {
            return VarList.Not_Found;
        }

        Donation donation = new Donation();
        donation.setAmount(donationDTO.getAmount());
        donation.setDate(donationDTO.getDate());
        donation.setNote(donationDTO.getNote());
        donation.setUser(user.get());

        donationRepository.save(donation);
        return VarList.Created;
    }

    @Override
    public int updateDonation(DonationDTO donationDTO) {
        Optional<Donation> optionalDonation = donationRepository.findById(donationDTO.getDonationId());
        if (!optionalDonation.isPresent()) {
            return VarList.Not_Found;
        }

        Donation donation = optionalDonation.get();
        donation.setAmount(donationDTO.getAmount());
        donation.setDate(donationDTO.getDate());
        donation.setNote(donationDTO.getNote());

        if (donationDTO.getUserDTO() != null) {
            Optional<User> user = userRepository.findById(donationDTO.getUserDTO().getUid());
            user.ifPresent(donation::setUser);
        }

        donationRepository.save(donation);
        return VarList.OK;
    }

    @Override
    public int deleteDonation(int id) {
        if (!donationRepository.existsById(id)) {
            return VarList.Not_Found;
        }
        donationRepository.deleteById(id);
        return VarList.OK;
    }

    @Override
    public List<DonationDTO> getAllDonations() {
        return donationRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public DonationDTO getDonationById(int id) {
        Optional<Donation> donation = donationRepository.findById(id);
        return donation.map(this::convertToDTO).orElse(null);
    }

    @Override
    public List<DonationDTO> getDonationsByUserId(int userId) {
        return null;
    }

    private DonationDTO convertToDTO(Donation donation) {
        DonationDTO dto = new DonationDTO();
        dto.setDonationId(donation.getDonationId());
        dto.setAmount(donation.getAmount());
        dto.setDate(donation.getDate());
        dto.setNote(donation.getNote());

        User user = donation.getUser();
        UserDTO userDTO = new UserDTO();
        userDTO.setUid(user.getUid());
        // Set other user fields if needed

        dto.setUserDTO(userDTO);
        return dto;
    }
}