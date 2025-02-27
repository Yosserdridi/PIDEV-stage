package com.example.back.services;


import com.example.back.entities.*;
import com.example.back.repository.ConventionRepository;
import com.example.back.repository.FileRepository;
import com.example.back.repository.SummerInternshipRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class SummerInternshipServiceImpl implements SummerInternshipService {

    SummerInternshipRepository summerInternshipRepository;
    FileRepository fileRepository;
    ConventionRepository conventionRepository;

    @Override
    public SummerInternship addSummerInternship(SummerInternship summerInternship) {
        return summerInternshipRepository.save(summerInternship);
    }

    @Override
    public SummerInternship getSummerInternship(long id) {
        return summerInternshipRepository.findById(id).get();

    }

    @Override
    public List<SummerInternship> getAllSummerInternships() {
        return summerInternshipRepository.findAll();
    }

    @Override
    public void deleteSummerInternship(long id) {

        summerInternshipRepository.deleteById(id);

    }

    @Override
    public SummerInternship updateSummerInternship(SummerInternship summerInternship) {
        return summerInternshipRepository.save(summerInternship);
    }

    @Override
    public void fileAssignToInternship(long idFile, long idInternship) {

    }

    /*@Override
    public void fileAssignToInternship(long idFile, long idInternship) {
        Files file =fileRepository.findById(idFile).get();
        SummerInternship summerInternship =summerInternshipRepository.findById(idInternship).get();

        summerInternship.setFile(file);
        summerInternshipRepository.save(summerInternship);
    }*/



    @Override
    public void ConventionAssignToInternship(long idConvention, long idInternship) {

        SummerInternship summerInternship =summerInternshipRepository.findById(idInternship).get();
        InternshipConvention internshipConvention =conventionRepository.findById(idConvention).get();

        summerInternship.setInternshipConvention(internshipConvention);
        summerInternshipRepository.save(summerInternship);
    }

    public SummerInternship addInternshipConvention(Long conventionId, SummerInternship summerInternship) {
        Optional<InternshipConvention> conventionOpt = conventionRepository.findById(conventionId);
        if (conventionOpt.isPresent()) {

        InternshipConvention convention =conventionOpt.get();
            summerInternship.setInternshipConvention(convention);
            return summerInternshipRepository.save(summerInternship);
        }
        throw new RuntimeException("conevnyion not found");
    }
}
