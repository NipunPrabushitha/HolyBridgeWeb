package lk.ijse.holybridge.repo;

import lk.ijse.holybridge.entity.Dues;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DuesRepository extends JpaRepository<Dues, Integer> {
    List<Dues> findByMember_MemberId(int memberId);
}