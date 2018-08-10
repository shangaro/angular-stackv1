import { Component } from "@angular/core";
import { IDeviceConfigService } from "../../../../shared/class-interface/idevice-config.service";

@Component({
    selector:'fw-mortality-and-hibernation-form',
    templateUrl:'./mortality-and-hibernation-form.component.html',
    styleUrls:['./mortality-and-hibernation-form.component.css']
})
export class MortalityAndHibernationFormComponent{
    public checked:boolean=false;
    public value:number=0;
    public timeList:string[]=[
       "OFF", "30 min","1 hr","2 hrs","3 hrs","4 hrs","6 hrs",
        "8 hrs","12 hrs","16 hrs","20 hrs","24 hrs","32 hrs",
        "40 hrs","48 hrs"
    ];
    public selectedTime:string="OFF";
    public wakeupTime:number[]=[3,6,9,12,15,28,21,24,27,30,33,36,39,42,45,48];
    public selectedWakeupTime:number=3;
    constructor(public deviceConfigService:IDeviceConfigService){
    }


}