package lk.ijse.holybridge.service;

import lk.ijse.holybridge.dto.DonationDTO;
import java.util.List;

public interface DonationService {
    int saveDonation(DonationDTO donationDTO);
    int updateDonation(DonationDTO donationDTO);
    int deleteDonation(int id);
    List<DonationDTO> getAllDonations();
    DonationDTO getDonationById(int id);
    List<DonationDTO> getDonationsByUserId(int userId);
}