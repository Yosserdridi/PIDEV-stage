package com.example.back.reopsitory;

import com.example.back.entities.InternshipConvention;
import com.example.back.entities.Student;
import com.example.back.entities.TypeInternship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
}
