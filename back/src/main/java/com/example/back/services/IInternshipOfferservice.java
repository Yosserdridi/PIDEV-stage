package com.example.back.services;

import com.example.back.entities.IntershipOffer;

import java.util.List;

public interface IInternshipOfferservice {
    IntershipOffer addIntershipOffer(IntershipOffer intershipOffer);
    List<IntershipOffer> retrieveAllIntershipOffers();
    IntershipOffer retireIntershipOffer(Long id);
    IntershipOffer updatePos(IntershipOffer id);
    void deleteIntershipOffer(Long id);
}
