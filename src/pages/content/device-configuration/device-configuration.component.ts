import {Component} from '@angular/core';
import { ISelect } from '../../widgets/map-widgets/map-widget.component';
@Component({
selector:'fw-device-configuration',
templateUrl:'./device-configuration.component.html',
styleUrls:['./device-configuration.component.css']
})

export class DeviceConfigurationComponent{
    public listItems:ISelect[]=[
        
        {
            value:'remote-configuration',viewValue:'Remote Configuration',
        },
        {
            value:'proximity-remote-setup',viewValue:'Proximity Remote Setup',
        },
        {
            value:'virtual-fence-setup', viewValue:'Virtual Fence Setup'
        }
    ];

    public defaultItem:ISelect={
        value:'scheduling',viewValue:'Scheduling'
    }
}