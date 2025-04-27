package lk.ijse.holybridge.dto;

public class EventDetailDTO {
    private int eventDetailId;
    private int quantity;
    private EventFacilityDTO eventFacility;
    private EventDTO event;

    // Constructors, Getters and Setters
    public EventDetailDTO() {
    }

    public EventDetailDTO(int eventDetailId, int quantity, EventFacilityDTO eventFacility, EventDTO event) {
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

    public EventFacilityDTO getEventFacility() {
        return eventFacility;
    }

    public void setEventFacility(EventFacilityDTO eventFacility) {
        this.eventFacility = eventFacility;
    }

    public EventDTO getEvent() {
        return event;
    }

    public void setEvent(EventDTO event) {
        this.event = event;
    }
}