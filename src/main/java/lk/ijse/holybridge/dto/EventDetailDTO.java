package lk.ijse.holybridge.dto;

import lk.ijse.holybridge.entity.Event;
import lk.ijse.holybridge.entity.EventFacility;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class EventDetailDTO {
    private int quantity;
    private EventFacility eventFacility;
    private Event event;
}
