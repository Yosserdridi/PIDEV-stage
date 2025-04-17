package com.example.back.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;

public class SoutenanceDetailsDTO {
    private int soutenanceId;
    private String studentFirstName;
    private String studentLastName;
    private String branche;
    private String grade;
    private float note;
    private Date dateSoutenance;
    private LocalTime hourSoutenance;
    private int salleNumber;
    private String bloc;
    private List<String> juryMembers;


    public SoutenanceDetailsDTO(int soutenanceId, String studentFirstName, String studentLastName, String branche, String grade, float note, Date dateSoutenance, LocalTime hourSoutenance, int salleNumber, String bloc, List<String> juryMembers) {
        this.soutenanceId = soutenanceId;
        this.studentFirstName = studentFirstName;
        this.studentLastName = studentLastName;
        this.branche = branche;
        this.grade = grade;
        this.note = note;
        this.dateSoutenance = dateSoutenance;
        this.hourSoutenance = hourSoutenance;
        this.salleNumber = salleNumber;
        this.bloc = bloc;
        this.juryMembers = juryMembers;
    }

    public String getBloc() {
        return bloc;
    }

    public void setBloc(String bloc) {
        this.bloc = bloc;
    }

    public int getSalleNumber() {
        return salleNumber;
    }

    public void setSalleNumber(int salleNumber) {
        this.salleNumber = salleNumber;
    }

    public LocalTime getHourSoutenance() {
        return hourSoutenance;
    }

    public void setHourSoutenance(LocalTime hourSoutenance) {
        this.hourSoutenance = hourSoutenance;
    }

    public Date getDateSoutenance() {
        return dateSoutenance;
    }

    public void setDateSoutenance(Date dateSoutenance) {
        this.dateSoutenance = dateSoutenance;
    }

    public float getNote() {
        return note;
    }

    public void setNote(float note) {
        this.note = note;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public String getBranche() {
        return branche;
    }

    public void setBranche(String branche) {
        this.branche = branche;
    }

    public String getStudentLastName() {
        return studentLastName;
    }

    public void setStudentLastName(String studentLastName) {
        this.studentLastName = studentLastName;
    }

    public String getStudentFirstName() {
        return studentFirstName;
    }

    public void setStudentFirstName(String studentFirstName) {
        this.studentFirstName = studentFirstName;
    }

    public int getSoutenanceId() {
        return soutenanceId;
    }

    public void setSoutenanceId(int soutenanceId) {
        this.soutenanceId = soutenanceId;
    }

    public List<String> getJuryMembers() {
        return juryMembers;
    }

    public void setJuryMembers(List<String> juryMembers) {
        this.juryMembers = juryMembers;
    }
}
