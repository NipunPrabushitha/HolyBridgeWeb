package lk.ijse.holybridge.repo;

import lk.ijse.holybridge.entity.Diocese;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DioceseRepository extends JpaRepository<Diocese, Integer> {
    boolean existsByName(String name);
    Optional<Diocese> findByName(String name);
    Optional<Diocese> findByUid(int id); // Add this method
}