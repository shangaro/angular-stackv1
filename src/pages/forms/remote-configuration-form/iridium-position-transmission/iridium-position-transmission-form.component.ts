import { Component } from "@angular/core";
import { IDeviceConfigService } from "../../../../shared/class-interface/idevice-config.service";

@Component({
    selector:'fw-iridium-position-transmission-form',
    templateUrl:'./iridium-position-transmission-form.component.html',
    styleUrls:['./iridium-position-transmission-form.component.css']
})
export class IridiumPositionTransmissionFormComponent{

    public positionTransmission:string[]=[
        "Every Fix",
        "Every 2nd Fix",
        "Every 3rd Fix",
        "Every 4th Fix",
        "Every 5th Fix",
        "Every 6th Fix",
        "Every 7th Fix",
        "Every 8th Fix",
        "Every 9th Fix",
        "Every 10th Fix"

    ];
    public selectedPosition:string="Every Fix";

    constructor( public deviceConfigService:IDeviceConfigService){
    }
    PostRequest(selectedPosition:string){
        console.log("**data",this.deviceConfigService.selectedDevices);

    }
    
}