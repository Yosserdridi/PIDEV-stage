package com.example.stage.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Postulation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id; // Identifiant unique

    private Boolean status; // Statut de la postulation
    private int postulationDate; // Date de postulation
    private String comment; // Commentaire sur la postulation

    @ManyToOne
    @JoinColumn(name = "intership_offer_id") // Colonne pour la relation avec IntershipOffer
    private IntershipOffer intershipOffer;

    @ManyToOne
    @JoinColumn(name = "student_id") // Colonne pour la relation avec Student
    private Student student;
}