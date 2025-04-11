package lk.ijse.holybridge.repo;

import lk.ijse.holybridge.entity.Parish;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ParishRepository extends JpaRepository<Parish, Integer> {
    boolean existsByName(String name);
    Optional<Parish> findByName(String name);
}