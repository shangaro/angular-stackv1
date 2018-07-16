import { Component } from "@angular/core";

@Component({
    selector:'fw-datepicker',
    templateUrl:'./datepicker.component.html',
    styleUrls:['./datepicker.component.css']
})
export class DatePickerComponent{
    
    currentDate=new Date();
    startDate=this.currentDate.getDate()+'/'+ (this.currentDate.getMonth()+1) + '/'+this.currentDate.getFullYear();

}