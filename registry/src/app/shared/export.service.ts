import { ElementRef, Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  constructor() {}

  tableToExcel(
    table: ElementRef | undefined,
    nameOfExcel: string,
    columnsToRemoveAtTheEnd: number = 0
  ) {
    if (table !== undefined) {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table.nativeElement);

      // Remove last column from worksheet object
      const aoa: any[][] = XLSX.utils.sheet_to_json(ws, {
        header: 1,
        raw: false,
      });
      const modifiedAoa: any[][] = aoa.map((row) =>
        row.slice(0, -columnsToRemoveAtTheEnd)
      );
      const modifiedWs: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(modifiedAoa);

      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, modifiedWs, 'Sheet1');

      XLSX.writeFile(wb, `${nameOfExcel}.xlsx`);
    }
  }
}
