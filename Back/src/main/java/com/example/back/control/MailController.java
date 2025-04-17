package com.example.back.control;

import com.example.back.entities.MailSoutenanceRequest;
import com.example.back.service.EmailService;
import com.example.back.service.PdfService;
import com.example.back.service.QrCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/mail")
@CrossOrigin(origins = "http://localhost:4200")
public class MailController {

    private EmailService emailService;

    private PdfService pdfService;

    private QrCodeService qrCodeService;

    @PostMapping("/send")
    public String sendMailWithPdf(@RequestBody MailSoutenanceRequest request) {
        try {
            if (request.getMailRequest() == null || request.getSoutenance() == null) {
                return "MailRequest or Soutenance data is missing!";
            }

            PdfService.PdfResult result = pdfService.generateSoutenancePdf(request.getSoutenance());

            if (result == null || result.pdfBytes == null || result.pdfUrl == null) {
                return "Failed to generate PDF or QR code.";
            }

            byte[] qrCodeBytes = qrCodeService.generateQrCodeFromUrl(result.pdfUrl);

            emailService.sendEmailWithPdfAndQr(
                    request.getMailRequest().getTo(),
                    request.getMailRequest().getSubject(),
                    request.getMailRequest().getText(),
                    result.pdfBytes,
                    qrCodeBytes
            );

            return "Email with PDF and QR code sent successfully!";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to send email with PDF and QR code.";
        }
    }
}