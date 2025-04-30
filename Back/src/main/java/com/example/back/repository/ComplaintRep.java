package com.example.back.repository;



import com.example.back.entities.Complaint;
import com.example.back.entities.StatusComplaint;
import com.example.back.entities.TypeComplaint;
import jakarta.persistence.metamodel.SingularAttribute;
import org.springframework.boot.BootstrapContext;
import org.springframework.data.jpa.domain.AbstractPersistable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.io.Serializable;
import java.util.List;






@Repository
public interface ComplaintRep extends JpaRepository<Complaint, Long> {


    List<Complaint> findByTypeC(TypeComplaint typeC);
    List<Complaint> findByTypeStatus(StatusComplaint statusComplaint);


}





