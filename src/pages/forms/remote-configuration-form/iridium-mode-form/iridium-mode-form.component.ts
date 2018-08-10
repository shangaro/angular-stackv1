import { Component } from "@angular/core";
import { IDeviceConfigService } from "../../../../shared/class-interface/idevice-config.service";

@Component({
    selector:'fw-iridium-mode-form',
    templateUrl:'./iridium-mode-form.component.html',
    styleUrls:['./iridium-mode-form.component.css']
})
export class IridiumModeFormComponent{
    public iridiumMode:string[]=[
        "1 - 1 fix per Message",
        "2 - 2 fixes per Message",
        "3 - 3 fixes per Message",
        "4 - 4 fixes per Message",
        "5 - 5 fixes per Message",
        "6 - 6 fixes per Message",
        "7 - 7 fixes per Message",
        "8 - 8 fixes per Message",
        "9 - 9 fixes per Message",
        "10 - 10 fixes per Message",
        "11 - 11 fixes per Message",
        "12 - 12 fixes per Message",
        "13 - 13 fixes per Message",
        "14 - 14 fixes per Message",
        "15 - 15 fixes per Message",
        "16 - 16 fixes per Message",
        "17 - 17 fixes per Message",
        "18 - 18 fixes per Message",
    ];

    public activityDataPerFix:string[]=[
        "0 - No Activity", "8 - (3 + 1 + 4)"
    ];
    public selectedActivityData:string="0 - No Activity";
    public selectedIridiumMode:string="1 - 1 fix per Message";

    constructor(public deviceConfigService:IDeviceConfigService){
        
    }
    PostForm(){
        // on http success
        alert("The request has been sent");
    }
}