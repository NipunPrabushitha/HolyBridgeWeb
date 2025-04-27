package lk.ijse.holybridge.repo;

import lk.ijse.holybridge.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EventRepository extends JpaRepository<Event, Integer> {
    @Query(value = "SELECT MAX(eventId) FROM Event")
    Integer findMaxEventId();
}