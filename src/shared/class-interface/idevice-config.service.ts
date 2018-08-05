import { Observable } from "rxjs";

export abstract class IDeviceConfigService{
    
     getDeviceConfigName:()=>string;
     getFileExtensionName:()=>string;
}

export interface IUploadData{
    fileExtension:string;
    enableLocalSunrise:boolean;
    deviceConfigName:string;
}