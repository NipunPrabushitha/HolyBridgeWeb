package lk.ijse.holybridge.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.UUID;

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

    public EventDetail() {

    }

    public EventDetail(int eventDetailId, int quantity, EventFacility eventFacility, Event event) {
        this.eventDetailId = eventDetailId;
        this.quantity = quantity;
        this.eventFacility = eventFacility;
        this.event = event;
    }

    public int getEventDetailId() {
        return eventDetailId;
    }

    public void setEventDetailId(int eventDetailId) {
        this.eventDetailId = eventDetailId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public EventFacility getEventFacility() {
        return eventFacility;
    }

    public void setEventFacility(EventFacility eventFacility) {
        this.eventFacility = eventFacility;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }
}
