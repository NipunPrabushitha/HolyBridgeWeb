package lk.ijse.holybridge.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.UUID;
@AllArgsConstructor
@NoArgsConstructor
@Data

@Entity
@Table(name = "member")
public class Member{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int memberId;

    private String name;
    private String address;
    private String contactNumber;
    private String gender;

    private String imagepath;
    @Column(nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd") // Ensures correct parsing
    private LocalDate dateOfBirth;
    @ManyToOne
    @JoinColumn(name = "parish_id", nullable = false)
    private Parish parish;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Dues> dues;
}
