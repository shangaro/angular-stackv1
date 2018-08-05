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
    panelItems:Array<IPanelItem>=schedulePanelItems;
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

interface IPanelItem{
    id:string;
    title:string;
    route:string;
}

