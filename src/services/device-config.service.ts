import { Injectable } from "@angular/core";
import { IDeviceConfigService, IUploadData } from "../shared/class-interface/idevice-config.service";

@Injectable()
export class DeviceConfigService implements IDeviceConfigService{
   
    public deviceConfigName:string="";
    public enableLocalSunrise:boolean=false;
    public fileExtension:string="";

    constructor(){
    }
    getDeviceConfigName(){
        return this.deviceConfigName.replace('Send','').trim();
    }
    getFileExtensionName(){
        let smallify=this.deviceConfigName.toLowerCase().replace('send','').trim();
        return this.chooseFileExtension(smallify);

    }

   chooseFileExtension(str:string):string{
    let extension:string="";
    switch(str){
        case"gps schedule": extension="GRF";
        break;
        case "vhf schedule": extension="BRF";
        break;
        case "proximity gps schedule":extension="GRF";
        break;
        case "iridium schedule" :extension="GSF";
        break;
        case "proximity schedule" : extension="PSF";
        break;
        case "activity schedule" :extension="ACF";
        break;
        default: extension="";
        

    }
    return extension;
   }
    
  

}


