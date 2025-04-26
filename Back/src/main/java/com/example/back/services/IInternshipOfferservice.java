package com.example.back.services;

import com.example.back.entities.IntershipOffer;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IInternshipOfferservice {
    IntershipOffer addIntershipOffer(IntershipOffer intershipOffer);
    List<IntershipOffer> retrieveAllIntershipOffers();
    IntershipOffer retireIntershipOffer(Long id);
    IntershipOffer updatePos(IntershipOffer id);
    void deleteIntershipOffer(Long id);
    String uploadImage(Long id, MultipartFile file);
    IntershipOffer getInternshipOfferWithImage(Long id);  // New method for image retrieval


}
