<?php

namespace App\Helpers;

use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpWord\TemplateProcessor;

class Report
{
    /**
     * Trích xuất Dinh Danh
     */
    public static function export_dinh_danh($dinh_danh)
    {
        // Prepare Excel File
        $file = storage_path('app/reports') . "/dinh-danh.xlsx";
        $reader = IOFactory::createReader("Xlsx");
        $spreadSheet = $reader->load($file);
        $sheet = $spreadSheet->getSheet(0);

        // Get number rows of Dinh danh
        $row_count = count($dinh_danh);
        $sheet->insertNewRowBefore(7, $row_count);
        $sheet->removeRow(5, 3);
        $row_index = 5;
        // Fill in the excel file
        foreach ($dinh_danh as $index => $dd) {
            $sheet->setCellValue("A$row_index", $index + 1);        // STT
            $sheet->setCellValue("B$row_index", $dd->ho_ten);
            $sheet->setCellValue("C$row_index", $dd->gia_tien);
            $sheet->setCellValue("D$row_index", $dd->gia_ban);

            $sheet->setCellValue("E$row_index", $dd->hang_bay);
            $sheet->setCellValue("F$row_index", $dd->f1);
            $sheet->setCellValue("G$row_index", $dd->sdt);
            $sheet->setCellValue("H$row_index", $dd->ghi_chu);

            $row_index++;
        }

        //set the header first, so the result will be treated as an xlsx file.
        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        //make it an attachment so we can define filename
        header('Content-Disposition: attachment;filename="result.xlsx"');
        $writer = IOFactory::createWriter($spreadSheet, "Xlsx");
        // Write file to output
        $writer->save('php://output');
    }

    public static function docx_report($type, $data)
    {

        $file = storage_path('app\\reports') . '\\' . str_replace('.', '\\', $type) . ".docx";
        $templateProcessor = new TemplateProcessor($file);
        $templateProcessor->setValues($data);

        //set the header first, so the result will be treated as an xlsx file.
        header('Content-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        //make it an attachment so we can define filename
        header('Content-Disposition: attachment;filename="result.docx"');

        // Write file to output
        $templateProcessor->saveAs('php://output');
    }
}
