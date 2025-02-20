package com.example.back.services;


import com.example.back.entities.InternshipConvention;
import com.example.back.entities.SummerInternship;
import com.example.back.repository.ConventionRepository;
import com.example.back.repository.SummerInternshipRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ConventionServiceImpl implements ConventionService {
    ConventionRepository conventionRepository;
     SummerInternshipRepository summerInternshipRepository;

    @Override
    public InternshipConvention addInternshipConvention(InternshipConvention internshipConvention) {
        return  conventionRepository.save(internshipConvention);
    }

    @Override
    public InternshipConvention getInternshipConvention(long id) {
        return conventionRepository.findById(id).get();
    }

    @Override
    public List<InternshipConvention> getAllInternshipConventions() {
        return  conventionRepository.findAll();
    }

    @Override
    public InternshipConvention updateInternshipConvention(InternshipConvention internshipConvention) {
        return conventionRepository.save(internshipConvention);
    }

    @Override
    public void deleteInternshipConvention(long id) {
         conventionRepository.deleteById(id);
    }


}
