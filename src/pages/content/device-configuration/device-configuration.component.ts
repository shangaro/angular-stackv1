import {Component, OnChanges} from '@angular/core';
import { ISelect } from '../../widgets/map-widgets/map-widget.component';
import { PanelBarItemModel } from '@progress/kendo-angular-layout';
import { DeviceConfigService } from '../../../services/device-config.service';
import { IDeviceConfigService } from '../../../shared/class-interface/idevice-config.service';
import { UploadTableComponent } from '../../tables/upload-table/upload-table.component';
import { MenuService } from '../../../services/menu.service';
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
   

    private panelItems: Array<PanelBarItemModel> = [
        <PanelBarItemModel> {title: 'Scheduling', selected:true,expanded:false, children: [
                <PanelBarItemModel> {title: 'Send GPS Schedule',content:UploadTableComponent },
                <PanelBarItemModel> {title: 'Send VHF Schedule' },
                <PanelBarItemModel> {title: 'Send Proximity GPS Schedule' },
                <PanelBarItemModel> {title: 'Clear Proximity Schedule' },
                <PanelBarItemModel> {title: 'Send Iridium Schedule' },
                <PanelBarItemModel> {title: 'Clear Iridium Schedule' },
                <PanelBarItemModel> {title: 'Send Proximity Schedule' },
                <PanelBarItemModel> {title: 'Send Activity Schedule' }

            ]
        },
        <PanelBarItemModel>{
            title:'Remote Configuration',children:[
                <PanelBarItemModel>{ title: 'Configure Iridium Mode'},
                <PanelBarItemModel>{ title:'Iridium Position Transmission'},
                <PanelBarItemModel>{title:'Mortality and Hibernation'},
                <PanelBarItemModel>{title: 'Drop-Off Release'}
            ]
        },
        <PanelBarItemModel>{
            title:'Proximity Remote Setup', children:[
                {title:'Proximity Mode'},
                {title:'Proximity Interval'},
                {title:'Proximity Duration'},
                {title:'Proximity Active Time'},
                {title:'Proximity Transmission'}
            ]
        },
        <PanelBarItemModel>{
            title:'Virtual Fence Setup',children:[
                {title:'Send Virtual Fence'},
                {title:'Virtual Fence Events'},
                {title:'Clear Virtual Fence'}
            ]
        }


        
    ];
    public _schedulePanelItems:any[];
    
    constructor(private deviceConfigService:DeviceConfigService, private ideviceConfigService:IDeviceConfigService,
                private menuService:MenuService)
    {
        this._schedulePanelItems=this.menuService.panelItems;
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

    includeDevice($event){
        alert("the device(s) has been added ");
    }

   
}