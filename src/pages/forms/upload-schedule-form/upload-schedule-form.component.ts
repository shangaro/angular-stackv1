import { FileRestrictions } from "@progress/kendo-angular-upload";
import { IDeviceConfigService } from "../../../shared/class-interface/idevice-config.service";
import { Component, OnDestroy } from "@angular/core";

@Component({
    selector:'fw-uploadscheduleform',
    templateUrl:'./upload-schedule-form.component.html',
    styleUrls:['./upload-schedule-form.component.css']
})
export class UploadScheduleFormComponent{
   

    public isFirstLetterVowel:boolean;
    checked:boolean=false;

    constructor(public deviceConfigService:IDeviceConfigService){
    this.isFirstLetterVowel=this.deviceConfigService.hasFirstLetterVowel;

    }

    uploadSaveUrl='saveUrl'; // should represent an API endpoint to submit files
    uploadRemoveUrl='removeUrl'; // should reporesent an API endpoint to submit files
    fileRestrictions:FileRestrictions={
    allowedExtensions:['.grf','bsf','acf','brf','psf','gsf'],
    maxFileSize:100000
    };

  
}
