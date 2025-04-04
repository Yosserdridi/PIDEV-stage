
package com.example.stage.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InternshipConvention {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id; // Identifiant unique

    private String companyName; // Nom de la société
    private Date startDate; // Date de début
    private Date endDate; // Date de fin
    private String companyAddress; // Adresse de la société
    private String companyContact; // Contact de la société

    @Enumerated(EnumType.STRING)
    private TypeInternship typeInternship; // Type de stage

    private Boolean isValid; // Statut de validité

    @ManyToOne
    @JoinColumn(name = "student_id") // Colonne pour la relation avec Student
    private Student student;

    @OneToOne(mappedBy = "internshipConvention", cascade = CascadeType.ALL)
    private SummerInternship summerInternship;

    @OneToOne(mappedBy = "internshipConvention", cascade = CascadeType.ALL)
    private InternshipPFE internshipPFE;
}