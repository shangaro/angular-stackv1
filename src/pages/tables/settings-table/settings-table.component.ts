import { Component } from "@angular/core";
import { products } from "./products";

@Component({
    selector:'fw-settings-table',
    templateUrl:'./settings-table.component.html',
    styleUrls:['./settings-table.component.css']
})

export class SettingsTableComponent{
    data:any[]=products;
}