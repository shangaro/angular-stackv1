import { Component } from "@angular/core";
import { products } from "./products";
import { ExcelExportData } from "@progress/kendo-angular-excel-export";

@Component({
    selector:'fw-listview-table',
    templateUrl:'./listview-table.component.html',
    styleUrls:['./listview-table.component.css']
})

export class ListViewTableComponent{
    data:any[]=products;

    public allData(): ExcelExportData {
        const result: ExcelExportData =  {
            data:products,
            group: null
        };

        return result;
    }
}