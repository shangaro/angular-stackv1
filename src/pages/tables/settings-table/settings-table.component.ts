import { Component } from "@angular/core";
import { products } from "./products";
import { ExcelExportData } from "@progress/kendo-angular-excel-export";

@Component({
    selector:'fw-settings-table',
    templateUrl:'./settings-table.component.html',
    styleUrls:['./settings-table.component.css']
})

export class SettingsTableComponent{
    data:any[]=products;

    public allData(): ExcelExportData {
        const result: ExcelExportData =  {
            data:products,
            group: null
        };

        return result;
    }
}