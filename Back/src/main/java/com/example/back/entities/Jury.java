package com.example.back.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Jury {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;

    @ElementCollection
    @CollectionTable(name = "jury_disponibilites", joinColumns = @JoinColumn(name = "jury_id"))
    @Column(name = "disponibilite")
    private List<LocalDateTime> disponibilites;

    // Constructeurs
    public Jury() {
    }

    public Jury(Long id, String nom, List<LocalDateTime> disponibilites) {
        this.id = id;
        this.nom = nom;
        this.disponibilites = disponibilites;
    }

    // Getters et Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public List<LocalDateTime> getDisponibilites() {
        return disponibilites;
    }

    public void setDisponibilites(List<LocalDateTime> disponibilites) {
        this.disponibilites = disponibilites;
    }

    // Méthode toString pour le débogage
    @Override
    public String toString() {
        return "Jury{" +
                "id=" + id +
                ", nom='" + nom + '\'' +
                ", disponibilites=" + disponibilites +
                '}';
    }
}