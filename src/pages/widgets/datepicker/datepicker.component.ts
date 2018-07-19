import { Component } from "@angular/core";

@Component({
    selector:'fw-datepicker',
    templateUrl:'./datepicker.component.html',
    styleUrls:['./datepicker.component.css']
})
export class DatePickerComponent{
    value:Date=new Date();
}