package com.example.back.service;

import com.example.back.entities.Soutenance;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;

@Service
public class PdfService {

    private final String PDF_CO_API_KEY = "nermineghouibii@gmail.com_XrI0ez2zSJR5X60wEzJnwSqMwtZXo1KC7I0QY67rpDkhayTQ2q6Tw8ufsRDdz5zC";

    public static class PdfResult {
        public byte[] pdfBytes;
        public String pdfUrl;

        public PdfResult(byte[] pdfBytes, String pdfUrl) {
            this.pdfBytes = pdfBytes;
            this.pdfUrl = pdfUrl;
        }
    }

    public PdfResult generateSoutenancePdf(Soutenance soutenance) {
        try {
            String url = "https://api.pdf.co/v1/pdf/convert/from/html";

            String htmlContent = String.format("""
                <html>
                <head>
                    <style>
                        body { font-family: Arial; margin: 30px; color: #333; }
                        .header { text-align: center; border-bottom: 2px solid #e74c3c; margin-bottom: 30px; padding-bottom: 10px; }
                        .header img { width: 100px; margin-bottom: 10px; }
                        .header h1 { margin: 0; font-size: 24px; color: #e74c3c; }
                        .details { background-color: #f9f9f9; padding: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); max-width: 600px; margin: 0 auto; }
                        .details table { width: 100%%; border-collapse: collapse; }
                        .details td { padding: 10px; font-size: 16px; }
                        .label { font-weight: bold; width: 40%%; color: #555; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <img src="https://cdn-icons-png.flaticon.com/512/747/747376.png" alt="Logo" />
                        <h1>Convocation à la Soutenance</h1>
                    </div>
                    <div class="details">
                        <table>
                            <tr><td class="label">Date</td><td>%s</td></tr>
                            <tr><td class="label">Tame</td><td>%s</td></tr>
                            <tr><td class="label">Block</td><td>%s</td></tr>
                            <tr><td class="label">Room</td><td>%d</td></tr>
                        </table>
                    </div>
                </body>
                </html>
            """,
                    new SimpleDateFormat("dd/MM/yyyy").format(soutenance.getDateSoutenace()),
                    soutenance.getHourSoutence().toString(),
                    soutenance.getBloc(),
                    soutenance.getSalleNumber()
            );

            HttpHeaders headers = new HttpHeaders();
            headers.set("x-api-key", PDF_CO_API_KEY);
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, Object> body = new HashMap<>();
            body.put("html", htmlContent);
            body.put("name", "soutenance.pdf");

            HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(body, headers);
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, Map.class);

            String pdfUrl = (String) response.getBody().get("url");

            if (pdfUrl != null) {
                URL fileUrl = new URL(pdfUrl);
                HttpURLConnection connection = (HttpURLConnection) fileUrl.openConnection();
                connection.setRequestMethod("GET");
                connection.connect();

                if (connection.getResponseCode() == HttpURLConnection.HTTP_OK) {
                    try (InputStream inputStream = connection.getInputStream();
                         ByteArrayOutputStream buffer = new ByteArrayOutputStream()) {
                        byte[] data = new byte[4096];
                        int nRead;
                        while ((nRead = inputStream.read(data, 0, data.length)) != -1) {
                            buffer.write(data, 0, nRead);
                        }
                        buffer.flush();
                        return new PdfResult(buffer.toByteArray(), pdfUrl);
                    }
                }
            }
            return null;
        } catch (Exception e) {
            return null;
        }
    }
}