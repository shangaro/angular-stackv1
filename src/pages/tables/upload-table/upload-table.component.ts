import {Component} from '@angular/core';
import { FileRestrictions } from '@progress/kendo-angular-upload';
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
    uploadSaveUrl='saveUrl'; // should represent an API endpoint to submit files
    uploadRemoveUrl='removeUrl'; // should reporesent an API endpoint to submit files
    fileRestrictions:FileRestrictions={
        allowedExtensions:['.bsf'],
        maxFileSize:100000
    };
}