package com.example.back.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.jmx.export.annotation.ManagedNotification;

import javax.security.auth.Subject;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class InternshipConvention {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String companyName;
    private Date startDate;
    private Date endDate;
    private String companyAddress;
    private String companyContact;

    @Enumerated(EnumType.STRING)
    @JsonProperty("typeInternship")
    private TypeInternship typeInternship;


    private Boolean isValid;

    @Getter(AccessLevel.NONE)
    @ManyToOne
    private  Student student;
    @Getter(AccessLevel.NONE)

    @OneToOne(mappedBy="internshipConvention")
    private  SummerInternship summerInternship;
    @Getter(AccessLevel.NONE)

    @OneToOne(mappedBy = "internshipConvention")
    private InternshipPFE internshipPFE;
}
