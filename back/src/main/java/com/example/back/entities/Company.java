package com.example.back.entities;


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


    /*
    @OneToMany(cascade = CascadeType.ALL, mappedBy="company")
    private Set<IntershipOffer> IntershipOffers;
*/
    @OneToOne
    private CompanyAgent companyAgent;




}

