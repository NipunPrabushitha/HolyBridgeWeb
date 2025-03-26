package lk.ijse.holybridge.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Parish {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int parishId;
    private String name;
    private String description;
    private String address;
    private String fartherName;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "diocese_id", nullable = false)
    private Diocese diocese;

    @OneToMany(mappedBy = "parish", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Member> members;

    @OneToMany(mappedBy = "parish", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Orphan> orphans;

    @OneToMany(mappedBy = "parish", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Event> events;

}
