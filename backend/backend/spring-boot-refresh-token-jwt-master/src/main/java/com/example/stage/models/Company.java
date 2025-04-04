package com.example.stage.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String companyName;
    private String adresse;
    private String sectorActivity;
    private String contact; // Correction de la casse
    private String webSite;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "company")
    private Set<IntershipOffer> internshipOffers; // Correction de la casse

    @OneToOne
    private CompanyAgent companyAgent; // Vérifiez que cela est bien lié à un User si nécessaire

    // Getters et Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getSectorActivity() {
        return sectorActivity;
    }

    public void setSectorActivity(String sectorActivity) {
        this.sectorActivity = sectorActivity;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getWebSite() {
        return webSite;
    }

    public void setWebSite(String webSite) {
        this.webSite = webSite;
    }

    public Set<IntershipOffer> getInternshipOffers() {
        return internshipOffers;
    }

    public void setInternshipOffers(Set<IntershipOffer> internshipOffers) {
        this.internshipOffers = internshipOffers;
    }

    public CompanyAgent getCompanyAgent() {
        return companyAgent;
    }

    public void setCompanyAgent(CompanyAgent companyAgent) {
        this.companyAgent = companyAgent;
    }
}