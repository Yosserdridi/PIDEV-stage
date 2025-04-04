package com.example.stage.models;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CompanyAgent extends User {

    private String contact;
    @OneToOne(mappedBy="companyAgent")
    private Company company;
}
