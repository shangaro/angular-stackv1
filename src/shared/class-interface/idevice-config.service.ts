import { Observable } from "rxjs";
import { IDevice } from "../../pages/tables/singlecolumn-table/singlecolumn-table.component";

export abstract class IDeviceConfigService{
    
     getDeviceConfigName:()=>string;
     getFileExtensionName:()=>string;
     hasFirstLetterVowel:boolean;
     selectedDevices:IDevice[];
}

export interface IUploadData{
    fileExtension:string;
    enableLocalSunrise:boolean;
    deviceConfigName:string;
}