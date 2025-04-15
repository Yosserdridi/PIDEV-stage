package com.example.back.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String companyName;
    private String adresse;
    private String sectorActivity;
    private String Contact;
    private String webSite;
    private String mail;


    @OneToMany(cascade = CascadeType.ALL)
    private Set<IntershipOffer> IntershipOffers;

    @OneToOne
    @JsonIgnore
    private CompanyAgent companyAgent;




}

