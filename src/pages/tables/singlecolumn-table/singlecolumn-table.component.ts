import {Component, OnInit} from '@angular/core';
import { IDeviceConfigService } from '../../../shared/class-interface/idevice-config.service';
import { RowArgs } from '@progress/kendo-angular-grid';
import { Observable, of } from 'rxjs';
@Component({
    selector:'fw-singlecolumn-table',
    templateUrl:'./singlecolumn-table.component.html',
    styleUrls:['./singlecolumn-table.component.css']
})

export class SingleColumnTableComponent{
   
    public selection:any[];
    constructor(public deviceConfigService:IDeviceConfigService){
        this.selection=[];
    }

    public onKeysChange(event:RowArgs){
        this.selection.push(event.dataItem);
        
    }
    public removeItems(selectedItems:any[]){

        selectedItems.forEach(item=>{
         this.deviceConfigService.selectedDevices=this.deviceConfigService.selectedDevices.filter(x=>x.DeviceID!==item);
            
        });
        console.log("new items",this.deviceConfigService.selectedDevices);
        alert("The device(s) have been removed from table");

        

        

    }
     
   
    
}
 export interface IDevice{
    DeviceID:string;
}