package com.example.back.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
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
    private String comanyContact;
    @Enumerated(EnumType.STRING)
    private TypeInternship typeInternship;
    private Boolean isValid;

    @ManyToOne
    Student student;

    @OneToOne(mappedBy="internshipConvention")
    SummerInternship summerInternship;

    @OneToOne(mappedBy = "internshipConvention")
    InternshipPFE internshipPFE;
}
