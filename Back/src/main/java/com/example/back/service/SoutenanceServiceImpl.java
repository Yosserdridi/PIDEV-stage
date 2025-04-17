package com.example.back.service;

import com.example.back.dto.SoutenanceDetailsDTO;
import com.example.back.dto.ValidatedFileDTO;
import com.example.back.entities.*;
import com.example.back.repository.FilesRepository;
import com.example.back.repository.JuryRepository;
import com.example.back.repository.SoutenanceRep;
import com.example.back.repository.TeacherRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SoutenanceServiceImpl implements SoutenanceService {

    private final FilesRepository filesRepository;
    private final SoutenanceRep soutenanceRepository;
    private final JuryRepository juryRepository;
    private final TeacherRepository teacherRepository;
    private final PdfService pdfService;
    private final QrCodeService qrCodeService;
    private final EmailService emailService;

    public SoutenanceServiceImpl(FilesRepository filesRepository, SoutenanceRep soutenanceRepository, JuryRepository juryRepository, TeacherRepository teacherRepository, PdfService pdfService, QrCodeService qrCodeService, EmailService emailService) {
        this.filesRepository = filesRepository;
        this.soutenanceRepository = soutenanceRepository;
        this.juryRepository = juryRepository;
        this.teacherRepository = teacherRepository;
        this.pdfService = pdfService;
        this.qrCodeService = qrCodeService;
        this.emailService = emailService;
    }

    @Override
    public Soutenance addSoutenance(Soutenance soutenance) {
        return soutenanceRepository.save(soutenance);
    }

    @Override
    @Transactional
    public Soutenance updateSoutenance(Soutenance updatedSoutenance) {
        Soutenance existingSoutenance = soutenanceRepository.findById(updatedSoutenance.getId())
                .orElseThrow(() -> new RuntimeException("Soutenance not found"));
        if (updatedSoutenance.getFiles() == null) {
            updatedSoutenance.setFiles(existingSoutenance.getFiles());
        }
        if (updatedSoutenance.getDateSoutenace() != null &&
                !updatedSoutenance.getDateSoutenace().equals(existingSoutenance.getDateSoutenace())) {
            existingSoutenance.setDateSoutenace(updatedSoutenance.getDateSoutenace());
        }

        if (updatedSoutenance.getHourSoutence() != null &&
                !updatedSoutenance.getHourSoutence().equals(existingSoutenance.getHourSoutence())) {
            existingSoutenance.setHourSoutence(updatedSoutenance.getHourSoutence());
        }

        if (updatedSoutenance.getBloc() != null &&
                !updatedSoutenance.getBloc().equals(existingSoutenance.getBloc())) {
            existingSoutenance.setBloc(updatedSoutenance.getBloc());
        }

        if (updatedSoutenance.getSalleNumber() != 0 &&
                updatedSoutenance.getSalleNumber() != existingSoutenance.getSalleNumber()) {
            existingSoutenance.setSalleNumber(updatedSoutenance.getSalleNumber());
        }

        return soutenanceRepository.save(existingSoutenance);
    }


    @Override
    @Transactional
    public void deleteSoutenance(Integer id) {
        Soutenance soutenance = soutenanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Soutenance not found"));

        LocalDateTime soutenanceTime = LocalDateTime.ofInstant(
                        soutenance.getDateSoutenace().toInstant(), ZoneId.systemDefault())
                .with(soutenance.getHourSoutence());

        List<Jury> assignedJuries = juryRepository.findAll().stream()
                .filter(jury -> jury.getDisponibilites().contains(soutenanceTime))
                .collect(Collectors.toList());

        assignedJuries.forEach(jury -> {
            jury.getDisponibilites().remove(soutenanceTime);
            juryRepository.save(jury);

            String[] nameParts = jury.getNom().split(" ");
            if (nameParts.length < 2) return;

            List<Teacher> teachers = teacherRepository.findByFirstNameAndLastName(
                    nameParts[0], nameParts[1]);

            teachers.forEach(teacher -> {
                teacher.setDisponiblePourSoutenance(true);
                teacherRepository.save(teacher);
            });
        });

        soutenanceRepository.deleteById(id);
    }



    @Override
    public Page<Soutenance> getAllSoutenances(Pageable pageable) {
        return soutenanceRepository.findAll(pageable);
    }

    @Override
    public List<ValidatedFileDTO> getValidatedFiles() {
        return filesRepository.findByNoteGreaterThan(10).stream()
                .filter(file -> !soutenanceRepository.existsByFiles_User_Id(file.getUser().getId()))
                .map(file -> new ValidatedFileDTO(
                        file.getId(),
                        file.getReport(),
                        file.getNote(),
                        file.getUser().getId(),
                        file.getUser().getFirstName(),
                        file.getUser().getLastName(),
                        file.getUser().getEmail()
                ))
                .collect(Collectors.toList());
    }


    @Override
    @Transactional
    public Soutenance scheduleSoutenance(int fileId, Soutenance soutenance) {
        Files file = filesRepository.findById((long) fileId)
                .orElseThrow(() -> new RuntimeException("File not found"));

        if (!(file.getUser() instanceof Student)) {
            throw new RuntimeException("Associated user is not a student.");
        }

        if (file.getNote() <= 10) {
            throw new RuntimeException("Student did not validate (note <= 10)");
        }

        Student student = (Student) file.getUser();

        boolean alreadyScheduled = soutenanceRepository.existsByFiles_User_Id(student.getId());
        if (alreadyScheduled) {
            throw new RuntimeException("This student already has a scheduled soutenance.");
        }

        LocalTime requestedTime = soutenance.getHourSoutence();
        LocalTime startInterval = requestedTime.minusMinutes(90);
        LocalTime endInterval = requestedTime.plusMinutes(90);

        Optional<Soutenance> conflict = soutenanceRepository.findBySalleNumberAndDateSoutenaceAndHourSoutenceBetween(
                soutenance.getSalleNumber(),
                soutenance.getDateSoutenace(),
                startInterval,
                endInterval
        );

        if (conflict.isPresent()) {
            throw new RuntimeException("This room is already reserved within a 1.5-hour interval.");
        }


        soutenance.setFiles(file);
        Soutenance savedSoutenance = soutenanceRepository.save(soutenance);


        PdfService.PdfResult pdfResult = pdfService.generateSoutenancePdf(savedSoutenance);

        if (pdfResult != null && pdfResult.pdfBytes != null && pdfResult.pdfUrl != null) {
            String qrContent = """
            *****************************
            Convocation à la Soutenance
            *****************************
            
            Date  : %s
            Heure : %s
            Bloc  : %s
            Salle : %d
            """.formatted(
                    new java.text.SimpleDateFormat("dd/MM/yyyy").format(savedSoutenance.getDateSoutenace()),
                    savedSoutenance.getHourSoutence().toString(),
                    savedSoutenance.getBloc(),
                    savedSoutenance.getSalleNumber()
            );

            byte[] qrCodeBytes = qrCodeService.generateQrCodeFromUrl(qrContent);

            String studentEmail = ((Student) file.getUser()).getEmail();
            String subject = "Votre soutenance a été planifiée";
            String html = """
    <html>
    <head>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f4f4f4;
                color: #333;
                padding: 0;
                margin: 0;
            }
            .email-container {
                max-width: 600px;
                margin: 40px auto;
                background-color: #fff;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            }
            .header {
                background-color: #e74c3c;
                padding: 20px;
                text-align: center;
                color: white;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
            }
            .content {
                padding: 30px;
            }
            .content p {
                font-size: 16px;
                line-height: 1.6;
            }
            .button {
                display: inline-block;
                margin-top: 20px;
                padding: 10px 20px;
                background-color: #e74c3c;
                color: white;
                text-decoration: none;
                border-radius: 4px;
                font-weight: bold;
            }
            .footer {
                padding: 20px;
                text-align: center;
                font-size: 14px;
                color: #999;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <h1>Defense Invitation</h1>
            </div>
            <div class="content">
                <p>Hello <strong>%s</strong>,</p>
                <p>We are pleased to inform you that your defense has been successfully scheduled.</p>
                <p>Please find attached your invitation in PDF format. A QR code containing this information is also included for quick access.</p>
                <p>
                    You can also view your invitation directly by clicking the button below :
                </p>
                <p style="text-align:center;">
                    <a class="button" href="%s" target="_blank">View My Invitation</a>
                </p>
                <p>We wish you the best of luck with your defense.</p>
                <p>Kind regards,<br>The Academic Team</p>
            </div>
            <div class="footer">
                © 2025 Université Esprit - Tous droits réservés.
            </div>
        </div>
    </body>
    </html>
""".formatted(
                    ((Student) file.getUser()).getFirstName(),
                    pdfResult.pdfUrl
            );

            emailService.sendEmailWithPdfAndQr(studentEmail, subject, html, pdfResult.pdfBytes, qrCodeBytes);
        }

        return soutenanceRepository.save(soutenance);
    }

    @Override
    @Transactional
    public Soutenance scheduleSoutenanceByStudentId(Long studentId, Soutenance soutenance) {
        Files file = filesRepository.findFirstByUser_IdAndNoteGreaterThan(studentId, 10)
                .orElseThrow(() -> new RuntimeException("No validated file found for student."));

        if (soutenanceRepository.existsByFiles_User_Id(studentId)) {
            throw new RuntimeException("Student already has a scheduled soutenance.");
        }

        LocalTime requestedTime = soutenance.getHourSoutence();
        LocalTime startInterval = requestedTime.minusMinutes(90);
        LocalTime endInterval = requestedTime.plusMinutes(90);

        // Clearly check exact (bloc, salle, time)
        List<Soutenance> conflicts = soutenanceRepository
                .findByDateSoutenaceAndBlocAndSalleNumberAndHourSoutenceBetween(
                        soutenance.getDateSoutenace(),
                        soutenance.getBloc(),
                        soutenance.getSalleNumber(),
                        startInterval,
                        endInterval
                );

        if (!conflicts.isEmpty()) {
            throw new RuntimeException("Room already reserved within ±1.5-hour interval.");
        }

        LocalDateTime soutenanceStart = LocalDateTime.ofInstant(
                soutenance.getDateSoutenace().toInstant(), ZoneId.systemDefault()
        ).with(soutenance.getHourSoutence());

        List<Teacher> allTeachers = teacherRepository.findCurrentlyAvailableTeachers();

        List<Teacher> availableTeachers = allTeachers.stream()
                .filter(teacher -> {
                    String fullName = teacher.getFirstName() + " " + teacher.getLastName();
                    return !juryRepository.isJuryAvailableAt(fullName, soutenanceStart);
                })
                .collect(Collectors.toList());

        if (availableTeachers.size() < 3) {
            throw new RuntimeException("No more teachers available at the requested time.");
        }

        Collections.shuffle(availableTeachers);
        List<Teacher> selectedTeachers = availableTeachers.subList(0, 3);

        selectedTeachers.forEach(teacher -> {
            teacher.setDisponiblePourSoutenance(false);
            teacherRepository.save(teacher);
        });

        soutenance.setFiles(file);
        Soutenance savedSoutenance = soutenanceRepository.save(soutenance);

        selectedTeachers.forEach(teacher -> {
            Jury jury = new Jury();
            jury.setNom(teacher.getFirstName() + " " + teacher.getLastName());
            jury.setDisponibilites(new ArrayList<>());
            jury.getDisponibilites().add(soutenanceStart);
            juryRepository.save(jury);
        });
        PdfService.PdfResult pdfResult = pdfService.generateSoutenancePdf(savedSoutenance);

        if (pdfResult != null && pdfResult.pdfBytes != null && pdfResult.pdfUrl != null) {
            String qrContent = """
                *****************************
                Convocation à la Soutenance
                *****************************
                
                Date  : %s
                Heure : %s
                Bloc  : %s
                Salle : %d
                """.formatted(
                    new java.text.SimpleDateFormat("dd/MM/yyyy").format(savedSoutenance.getDateSoutenace()),
                    savedSoutenance.getHourSoutence().toString(),
                    savedSoutenance.getBloc(),
                    savedSoutenance.getSalleNumber()
            );

            byte[] qrCodeBytes = qrCodeService.generateQrCodeFromUrl(qrContent);

            String studentEmail = ((Student) file.getUser()).getEmail();
            String subject = "Votre soutenance a été planifiée";
            String html = """
    <html>
    <head>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f4f4f4;
                color: #333;
                padding: 0;
                margin: 0;
            }
            .email-container {
                max-width: 600px;
                margin: 40px auto;
                background-color: #fff;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            }
            .header {
                background-color: #e74c3c;
                padding: 20px;
                text-align: center;
                color: white;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
            }
            .content {
                padding: 30px;
            }
            .content p {
                font-size: 16px;
                line-height: 1.6;
            }
            .button {
                display: inline-block;
                margin-top: 20px;
                padding: 10px 20px;
                background-color: #e74c3c;
                color: white;
                text-decoration: none;
                border-radius: 4px;
                font-weight: bold;
            }
            .footer {
                padding: 20px;
                text-align: center;
                font-size: 14px;
                color: #999;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <h1>Defense Invitation</h1>
            </div>
            <div class="content">
                <p>Hello <strong>%s</strong>,</p>
                <p>We are pleased to inform you that your defense has been successfully scheduled.</p>
                <p>Please find attached your invitation in PDF format. A QR code containing this information is also included for quick access.</p>
                <p>
                    You can also view your invitation directly by clicking the button below :
                </p>
                <p style="text-align:center;">
                    <a class="button" href="%s" target="_blank">View My Invitation</a>
                </p>
                <p>We wish you the best of luck with your defense.</p>
                <p>Kind regards,<br>The Academic Team</p>
            </div>
            <div class="footer">
                © 2025 Université Esprit - Tous droits réservés.
            </div>
        </div>
    </body>
    </html>
""".formatted(
                    ((Student) file.getUser()).getFirstName(),
                    pdfResult.pdfUrl
            );


            emailService.sendEmailWithPdfAndQr(studentEmail, subject, html, pdfResult.pdfBytes, qrCodeBytes);
        }

        return savedSoutenance;
    }


    @Scheduled(fixedRate = 60000)
    @Transactional
    public void updateJuryAndTeacherAvailability() {
        LocalDateTime now = LocalDateTime.now();

        List<Jury> juries = juryRepository.findAll();
        juries.forEach(jury -> {
            jury.getDisponibilites().removeIf(dispo -> dispo.plusMinutes(90).isBefore(now));
            juryRepository.save(jury);
        });

        List<Teacher> unavailableTeachers = teacherRepository.findAll()
                .stream()
                .filter(t -> !t.getDisponiblePourSoutenance())
                .collect(Collectors.toList());

        unavailableTeachers.forEach(teacher -> {
            boolean stillAssigned = juries.stream().anyMatch(jury ->
                    jury.getNom().equals(teacher.getFirstName() + " " + teacher.getLastName()) &&
                            jury.getDisponibilites().stream().anyMatch(dispo -> dispo.plusMinutes(90).isAfter(now))
            );

            if (!stillAssigned) {
                teacher.setDisponiblePourSoutenance(true);
                teacherRepository.save(teacher);
            }
        });
    }


    private boolean jurysAssignedToTeacher(Teacher teacher, LocalDateTime currentTime) {
        String fullName = teacher.getFirstName() + " " + teacher.getLastName();
        return juryRepository.existsByNomAndDisponibilitesAfter(fullName, currentTime.minusMinutes(90));
    }

    @Override
    public List<SoutenanceDetailsDTO> getAllSoutenanceDetails() {
        return soutenanceRepository.findAll().stream()
                .filter(s -> s.getFiles() != null && s.getFiles().getUser() instanceof Student)
                .map(s -> {
                    Student student = (Student) s.getFiles().getUser();

                    LocalDateTime soutenanceDateTime = LocalDateTime.ofInstant(
                                    s.getDateSoutenace().toInstant(), ZoneId.systemDefault()
                            ).withHour(s.getHourSoutence().getHour())
                            .withMinute(s.getHourSoutence().getMinute())
                            .withSecond(0)
                            .withNano(0);

                    List<String> juries = juryRepository.findAll().stream()
                            .filter(j -> j.getDisponibilites().stream()
                                    .anyMatch(dispo -> dispo.withSecond(0).withNano(0).isEqual(soutenanceDateTime)))
                            .map(Jury::getNom)
                            .collect(Collectors.toList());

                    return new SoutenanceDetailsDTO(
                            s.getId(),
                            student.getFirstName(),
                            student.getLastName(),
                            student.getBranche(),
                            student.getGrade(),
                            s.getFiles().getNote(),
                            s.getDateSoutenace(),
                            s.getHourSoutence(),
                            s.getSalleNumber(),
                            s.getBloc(),
                            juries
                    );
                })
                .collect(Collectors.toList());
    }
}
