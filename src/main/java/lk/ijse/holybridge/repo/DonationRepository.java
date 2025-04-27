package lk.ijse.holybridge.repo;

import lk.ijse.holybridge.entity.Donation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface DonationRepository extends JpaRepository<Donation, Integer> {
   //List<Donation> findByUser_Uid(int userId);
}