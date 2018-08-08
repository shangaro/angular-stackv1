import { Injectable } from "@angular/core";
import { IDeviceConfigService, IUploadData } from "../shared/class-interface/idevice-config.service";
import { IDevice } from "../pages/tables/singlecolumn-table/singlecolumn-table.component";

@Injectable()
export class DeviceConfigService implements IDeviceConfigService{
    public selectedDevices: IDevice[];
    hasFirstLetterVowel: boolean=false;
    vowelList:string[]=['a','e','i','o','u'];
    public deviceConfigName:string="";
    public enableLocalSunrise:boolean=false;
    public fileExtension:string="";

    constructor(){
        this.selectedDevices=[];
    }
    getDeviceConfigName(){

        let name= this.deviceConfigName.replace('Send','').trim();
        this.hasFirstLetterVowel=this.vowelList.find(x=>x===name.toLowerCase()[0]) ? true : false;
        return name;
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


