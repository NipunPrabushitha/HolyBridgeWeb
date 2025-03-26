package lk.ijse.holybridge.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;
import java.util.UUID;
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "orphan")
public class Orphan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orphanId;

    @Column(nullable = false)
    private String name;

    private String imagepath;

    @Column(nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd") // Ensures correct parsing
    private LocalDate dateOfBirth;

    @Column(nullable = false)
    private String gender;

    @ManyToOne
    @JoinColumn(name = "parish_id", nullable = false)
    private Parish parish;

}
