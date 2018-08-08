import { Injectable, OnDestroy } from "@angular/core";
import { faChartPie, faCogs, faGlobe, faList, faWrench } from "@fortawesome/free-solid-svg-icons";


export interface IMenuItem{
 text:string;
 icon:any;
 route:string;
 submenu:IMenuItem[];

}
let initialMenuItems:IMenuItem[]=[

    {
        text:"DashBoard",
        icon:faChartPie,
        route:'./dashboard',
        submenu:null
    },
  
  
    {
        text:"ListView & Downloads",
        icon:faList,
        route:'./listview',
        submenu:null
    },
    {
        text:"Device Configuration",
        icon:faWrench,
        route:'./device-configuration',
        submenu:null
    },
    {
        text:"Account Settings",
        icon:faCogs,
        route:'./settings',
        submenu:null
    },
];

@Injectable()
export class MenuService implements OnDestroy{
   
     
    menuItems:Array<IMenuItem>=initialMenuItems;
    public schedulepanelItems:Array<IPanelItem>=schedulePanelItems;
    public remoteConfigPanelItems:IPanelItem[]=remoteConfigPanelItems;
    public proximityRemoteSetupPanelItems:IPanelItem[]=proximityRemoteSetupPanelItems;
    public virtualFenceSetupPanelItems:IPanelItem[]=virtualFenceSetupPanelItems;
    isVertical:boolean=false;
    isSmallScreenMenu:boolean=false;

    constructor(){}

   showSmallScreenMenu($event){
        this.isSmallScreenMenu=!this.isSmallScreenMenu;
   }

   ngOnDestroy(): void {
    this.isSmallScreenMenu=false;
   }
}

let schedulePanelItems:IPanelItem[]=[
    {id:'1.1',title:'Send GPS Schedule',route:'./scheduling/send-gps-schedule'},
    {id:'1.2',title:'Send VHF Schedule',route:'./scheduling/send-vhf-schedule'},
    {id:'1.3',title:'Send Proximity GPS Schedule',route:'./scheduling/send-proximity-gps-schedule'},
    {id:'1.4', title:'Clear Proximity GPS Schedule',route:'./scheduling/clear-proximity-gps-schedule'},
    {id:'1.5',title:'Send Iridium Schedule',route:'./scheduling/send-iridium-schedule'},
    {id:'1.6',title:'Clear Iridium Schedule',route:'./scheduling/clear-iridium-schedule'},
    {id:'1.7',title:'Send Proximity Schedule',route:'./scheduling/send-proximity-schedule'},
    {id:'1.8',title:'Send Activity Schedule',route:'./scheduling/send-activity-schedule'}
];
let remoteConfigPanelItems:IPanelItem[]=[
    {id:'2.1',title:'Configure Iridium Mode',route:'./remote-configuration/configure-iridium-mode'},
    {id:'2.2',title:'Iridium Position Transmission',route:'./remote-configuration/iridium-position-transmission'},
    {id:'2.3',title:'Mortality and Hibernation',route:'./remote-configuration/mortality-and-hibernation'},
    {id:'2.4',title:'Trigger Drop-Off Release',route:'./remote-configuration/trigger-drop-off-release'}
];
let proximityRemoteSetupPanelItems:IPanelItem[]=[
    {id:'3.1',title:'Proximity Mode',route:'./proximity-remote-setup/proximity-mode'},
    {id:'3.2',title:'Proximity Interval',route:'./proximity-remote-setup/proximity-duration'},
    {id:'3.3',title:'Proximity Duration',route:'./proximity-remote-setup/proximity-active-time'},
    {id:'3.4',title:'Proximity Transmission',route:'./proximity-remote-setup/proximity-transmission'}
];
let virtualFenceSetupPanelItems:IPanelItem[]=[
    {id:'4.1',title:'Send Virtual Fence',route:'./virtual-fence-setup/send-virtualFence'},
    {id:'4.2',title:'Virtual Fence Events',route:'./virtual-fence-setup/virtual-fence-events'},
    {id:'4.3',title:'Clear Virtual Fence',route:'./virtual-fence-setup/clear-virtual-fence'}
];

interface IPanelItem{
    id:string;
    title:string;
    route:string;
}

