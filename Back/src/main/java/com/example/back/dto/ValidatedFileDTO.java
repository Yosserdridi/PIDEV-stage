package com.example.back.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

public class ValidatedFileDTO {
    private Long fileId;
    private String report;
    private float note;
    private Long studentId;
    private String studentFirstName;
    private String studentLastName;
    private String studentEmail;

    public ValidatedFileDTO(Long fileId, String report, float note, Long studentId, String studentFirstName, String studentLastName, String studentEmail) {
        this.fileId = fileId;
        this.report = report;
        this.note = note;
        this.studentId = studentId;
        this.studentFirstName = studentFirstName;
        this.studentLastName = studentLastName;
        this.studentEmail = studentEmail;
    }

    public Long getFileId() {
        return fileId;
    }

    public void setFileId(Long fileId) {
        this.fileId = fileId;
    }

    public String getReport() {
        return report;
    }

    public void setReport(String report) {
        this.report = report;
    }

    public float getNote() {
        return note;
    }

    public void setNote(float note) {
        this.note = note;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public String getStudentFirstName() {
        return studentFirstName;
    }

    public void setStudentFirstName(String studentFirstName) {
        this.studentFirstName = studentFirstName;
    }

    public String getStudentLastName() {
        return studentLastName;
    }

    public void setStudentLastName(String studentLastName) {
        this.studentLastName = studentLastName;
    }

    public String getStudentEmail() {
        return studentEmail;
    }

    public void setStudentEmail(String studentEmail) {
        this.studentEmail = studentEmail;
    }
}
