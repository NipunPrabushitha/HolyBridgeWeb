package lk.ijse.holybridge.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.UUID;
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class EventDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int eventDetailId;

    private int quantity;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "eventFacility_id", nullable = false)
    private EventFacility eventFacility;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;

}
