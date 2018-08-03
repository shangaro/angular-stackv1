import { Component } from '@angular/core';
import { DeviceData } from '../../../shared/deviceData';
import { DataStateChangeEvent, GridDataResult,GridComponent } from '@progress/kendo-angular-grid';
import { State,process } from '@progress/kendo-data-query';
@Component({
    selector:'fw-device-config-table',
    templateUrl:'./device-configuration-table.component.html',
    styleUrls:['./device-configuration-table.component.css']
})
export class DeviceConfigurationTableComponent{
    public state: State = {
        skip: 0,
        take: 5,

        // Initial filter descriptor
        // filter: {
        //   logic: 'and',
        //   filters: [{ field:'DeviceID', operator: 'contains',value:'1234'}]
        // }
    };

    public gridData: GridDataResult = process(DeviceData, this.state);

    public dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.gridData = process(DeviceData, this.state);
    }
}