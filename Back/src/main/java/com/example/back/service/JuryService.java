package com.example.back.service;
import com.example.back.entities.Jury;
import com.example.back.repository.JuryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class JuryService {

    @Autowired
    private List<Jury> jurysDisponibles;
    private final Map<String, List<String>> affectations = new HashMap<>();
    @Autowired
    public JuryService(List<Jury> jurysDisponibles) {
        this.jurysDisponibles = jurysDisponibles;
    }
    private JuryRepository juryRepository;


   /* public JuryService() {
        // Initialisation des jurys avec leurs disponibilités (peut être récupéré d'une API externe)
        jurysDisponibles = new ArrayList<>();
        jurysDisponibles.add(new Jury(1, "Dr. Dupont", Arrays.asList(
                LocalDateTime.of(2025, 3, 10, 9, 0),
                LocalDateTime.of(2025, 3, 10, 11, 0))));
        jurysDisponibles.add(new Jury(2, "Dr. Martin", Arrays.asList(
                LocalDateTime.of(2025, 3, 10, 9, 0),
                LocalDateTime.of(2025, 3, 10, 14, 0))));
        // Ajouter d'autres jurys...
    }*/
    public List<Jury> assignerJurys(List<Jury> jurys, String dateSoutenance) {
        // Convertir la date de soutenance en LocalDateTime
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
        LocalDateTime soutenanceDate = LocalDateTime.parse(dateSoutenance, formatter);

        // Vérifier si les disponibilités sont en String ou LocalDateTime
        List<Jury> juryDisponible = jurys.stream()
                .filter(jury -> jury.getDisponibilites().stream()
                        .anyMatch(dispo -> dispo.isEqual(soutenanceDate) || dispo.isAfter(soutenanceDate))
                )
                .limit(4)  // On prend 4 jurys max
                .collect(Collectors.toList());

        return juryDisponible.size() == 4 ? juryDisponible : List.of(); // Retourne les jurys assignés
    }
}

