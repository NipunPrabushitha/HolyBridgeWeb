package lk.ijse.holybridge.repo;

import lk.ijse.holybridge.entity.VarificationOTP;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OTPRepo extends JpaRepository<VarificationOTP , Long> {
    Optional<VarificationOTP> findTopByEmailOrderByExpiryTimeDesc(String email);
}
