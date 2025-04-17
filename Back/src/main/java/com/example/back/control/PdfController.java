package com.example.back.control;

import com.example.back.entities.MailSoutenanceRequest;
import com.example.back.service.EmailService;
import com.example.back.service.PdfService;
import com.example.back.service.QrCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pdf")
@CrossOrigin(origins = "http://localhost:4200")
public class PdfController {

    private PdfService pdfService;

    private EmailService emailService;

    private QrCodeService qrCodeService;

    @PostMapping("/generate-and-send")
    public ResponseEntity<String> generatePdfAndSendEmail(@RequestBody MailSoutenanceRequest request) {
        try {
            if (request.getMailRequest() == null || request.getSoutenance() == null) {
                return ResponseEntity.badRequest().body("Missing email or soutenance data.");
            }

            PdfService.PdfResult pdfResult = pdfService.generateSoutenancePdf(request.getSoutenance());

            if (pdfResult == null || pdfResult.pdfBytes == null || pdfResult.pdfUrl == null) {
                return ResponseEntity.internalServerError().body("Failed to generate PDF or retrieve PDF URL.");
            }

            byte[] qrCodeBytes = qrCodeService.generateQrCodeFromUrl(pdfResult.pdfUrl);

            emailService.sendEmailWithPdfAndQr(
                    request.getMailRequest().getTo(),
                    request.getMailRequest().getSubject(),
                    request.getMailRequest().getText(),
                    pdfResult.pdfBytes,
                    qrCodeBytes
            );

            return ResponseEntity.ok("Email sent successfully with PDF and QR code!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Failed to generate PDF and send email.");
        }
    }
}