package lk.ijse.holybridge.repo;

import lk.ijse.holybridge.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Integer> {
    boolean existsByContactNumber(String contactNumber);
    Optional<Member> findByContactNumber(String contactNumber);
}