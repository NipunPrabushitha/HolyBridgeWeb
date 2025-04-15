package lk.ijse.holybridge.repo;

import lk.ijse.holybridge.entity.Orphan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface OrphanRepository extends JpaRepository<Orphan, Integer> {
    List<Orphan> findByParish_ParishId(int parishId);
    boolean existsByNameAndDateOfBirth(String name, LocalDate dateOfBirth);
}