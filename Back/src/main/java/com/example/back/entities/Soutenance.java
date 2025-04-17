package com.example.back.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;
import java.util.Date;

@Entity

public class Soutenance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private Date dateSoutenace;

    private LocalTime hourSoutence;

    private  Integer salleNumber;
    private String bloc;

    @OneToOne
    private Files files;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getDateSoutenace() {
        return dateSoutenace;
    }

    public void setDateSoutenace(Date dateSoutenace) {
        this.dateSoutenace = dateSoutenace;
    }

    public LocalTime getHourSoutence() {
        return hourSoutence;
    }

    public void setHourSoutence(LocalTime hourSoutence) {
        this.hourSoutence = hourSoutence;
    }

    public int getSalleNumber() {
        return salleNumber;
    }

    public void setSalleNumber(int salleNumber) {
        this.salleNumber = salleNumber;
    }

    public String getBloc() {
        return bloc;
    }

    public void setSalleNumber(Integer salleNumber) {
        this.salleNumber = salleNumber;
    }

    public Files getFiles() {
        return files;
    }

    public void setFiles(Files files) {
        this.files = files;
    }

    public void setBloc(String bloc) {
        this.bloc = bloc;
    }
}

