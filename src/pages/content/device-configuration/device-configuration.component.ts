import {Component, OnChanges} from '@angular/core';
import { ISelect } from '../../widgets/map-widgets/map-widget.component';
import { DeviceConfigService } from '../../../services/device-config.service';
import { IDeviceConfigService } from '../../../shared/class-interface/idevice-config.service';
import { MenuService } from '../../../services/menu.service';
import { State,process } from '@progress/kendo-data-query';
import { GridDataResult, DataStateChangeEvent, RowArgs } from '@progress/kendo-angular-grid';
import { DeviceData } from '../../../shared/deviceData';
import { IDevice } from '../../tables/singlecolumn-table/singlecolumn-table.component';
@Component({
selector:'fw-device-configuration',
templateUrl:'./device-configuration.component.html',
styleUrls:['./device-configuration.component.css']
})

export class DeviceConfigurationComponent{
    panelItemName:string="";
    fileExtension:string="";
    public clearing:boolean=false;

    public deviceList:ISelect[]=[
        
        {
            value:'litetrack/pinpoint-iridium-collars',viewValue:'Litetrack/PinPoint Iridium Collars'
        },
        {
            value:'iridium-track-collars',viewValue:'IridiumTrack Collars'
        },
       
    ];
    public defaultDevice:ISelect={
        value:null,viewValue:'Choose a device family'
    }
    public mySelection:IDevice[]=[];
    public state: State = {
        skip: 0,
        take: 5,
    };

    public schedulePanelItems:any[];
    public remoteConfigPanelItems:any[];
    public proximityRemoteSetupPanelItems:any[];
    public virtualFenceSetupPanelItems:any[];
    public gridData:GridDataResult;
    constructor(private deviceConfigService:DeviceConfigService, private ideviceConfigService:IDeviceConfigService,
                private menuService:MenuService)
    {
        this.schedulePanelItems=this.menuService.schedulepanelItems;
        this.remoteConfigPanelItems=this.menuService.remoteConfigPanelItems;
        this.proximityRemoteSetupPanelItems=this.menuService.proximityRemoteSetupPanelItems;
        this.virtualFenceSetupPanelItems=this.menuService.virtualFenceSetupPanelItems;
        this.gridData=process(DeviceData,this.state);
    }
   
    selectedPanelItem(event:any){
        console.log("event nature:",event);
        this.deviceConfigService.deviceConfigName=event.target.textContent;
        this.panelItemName=this.ideviceConfigService.getDeviceConfigName();
        console.log("device name is", this.panelItemName);

        let x= this.ideviceConfigService.getFileExtensionName();
        console.log("FileExtension is", x);

        this.panelItemName.startsWith('Clear')?true :false;

    }


    public dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.gridData = process(DeviceData,this.state);
    }
    public onKeysChange(event:RowArgs){
        this.mySelection.push(event.dataItem);
        this.mySelection=this.mySelection.filter(element=>element!==undefined);
        
        console.log("selection:",this.mySelection);
    }

    includeDevice(deviceList:any[]){
       deviceList.forEach(device =>{
        let elem={'DeviceID':device};
        this.deviceConfigService.selectedDevices.push(elem);

       });
        console.log("devices are ",this.ideviceConfigService.selectedDevices);
        alert("the device(s) has been added ");
    }

   
}