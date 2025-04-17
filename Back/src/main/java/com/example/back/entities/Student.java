package com.example.back.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity

public class Student extends User{
    private String registrationNumber;
    private String cv;
    private String branche;
    private String grade;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="student")
    private Set<Postulation> postulations;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="student")
    private Set<InternshipConvention> internshipConventions ;

    public String getRegistrationNumber() {
        return registrationNumber;
    }

    public void setRegistrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
    }

    public String getCv() {
        return cv;
    }

    public void setCv(String cv) {
        this.cv = cv;
    }

    public String getBranche() {
        return branche;
    }

    public void setBranche(String branche) {
        this.branche = branche;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public Set<Postulation> getPostulations() {
        return postulations;
    }

    public void setPostulations(Set<Postulation> postulations) {
        this.postulations = postulations;
    }

    public Set<InternshipConvention> getInternshipConventions() {
        return internshipConventions;
    }

    public void setInternshipConventions(Set<InternshipConvention> internshipConventions) {
        this.internshipConventions = internshipConventions;
    }
}
