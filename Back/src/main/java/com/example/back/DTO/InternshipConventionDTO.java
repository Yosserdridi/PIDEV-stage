package com.example.back.DTO;

import com.example.back.entities.TypeInternship;

import java.util.Date;

public interface InternshipConventionDTO {
    Long getId();
    String getCompanyName();
    Date getStartDate();
    Date getEndDate();
    String getCompanyAddress();
    String getCompanyContact();
    TypeInternship getTypeInternship();
    Boolean getIsValid();
    String getStudentFirstName();
}
