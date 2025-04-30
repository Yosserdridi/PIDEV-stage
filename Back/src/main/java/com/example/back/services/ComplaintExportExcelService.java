package com.example.back.services;





import com.example.back.entities.Complaint;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;


import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;


@Service
public class ComplaintExportExcelService {


    public ByteArrayInputStream exportToExcel(List<Complaint> complaints) throws IOException {
        String[] columns = {"ID", "Titre", "Contenu", "Date", "Type", "Statut"};


        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Réclamations");


            // Header
            Row headerRow = sheet.createRow(0);
            for (int col = 0; col < columns.length; col++) {
                Cell cell = headerRow.createCell(col);
                cell.setCellValue(columns[col]);
            }


            // Data
            int rowIdx = 1;
            for (Complaint complaint : complaints) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(complaint.getId());
                row.createCell(1).setCellValue(complaint.getTitle());
                row.createCell(2).setCellValue(complaint.getContent());
                row.createCell(3).setCellValue(complaint.getDateComplaint().toString());
                row.createCell(4).setCellValue(complaint.getTypeC().toString());
                row.createCell(5).setCellValue(complaint.getTypeStatus().toString());
            }


            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        }
    }
}



