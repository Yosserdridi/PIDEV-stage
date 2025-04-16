package com.example.back.services;

import com.example.back.entities.SummerInternship;

import java.util.List;

public interface SummerInternshipService {

    public SummerInternship addSummerInternship(SummerInternship summerInternship);
    public SummerInternship getSummerInternship(long id);
    public List<SummerInternship> getAllSummerInternships();
    public void deleteSummerInternship(long id);
    public SummerInternship updateSummerInternship(SummerInternship summerInternship);

    void fileAssignToInternship(long idFile, long idInternship);

    void ConventionAssignToInternship(long idConvention, long idInternship);


}
