import {Component, OnInit} from '@angular/core';
import { FileRestrictions } from '@progress/kendo-angular-upload';
import { IDeviceConfigService } from '../../../shared/class-interface/idevice-config.service';
@Component({
    selector:'fw-upload-table',
    templateUrl:'./upload-table.component.html',
    styleUrls:['./upload-table.component.css']
})

export class UploadTableComponent{
    
    public selectedDeviceList=
    [
        {
            'DeviceID':'1234'
        },
        {
            'DeviceID':'5678'
        }
    ];
    
    
    constructor(private deviceConfigService:IDeviceConfigService){

    }
    // fileExtension=this.deviceConfigService.getFileExtensionName().toLowerCase();
    uploadSaveUrl='saveUrl'; // should represent an API endpoint to submit files
    uploadRemoveUrl='removeUrl'; // should reporesent an API endpoint to submit files
    fileRestrictions:FileRestrictions={
        allowedExtensions:['grf','bsf','acf','brf','psf','gsf'],
        maxFileSize:100000
    };
    
}