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
        text:"Settings",
        icon:faCogs,
        route:'./settings',
        submenu:null
    },
    {
        text:"Countries",
        icon:faGlobe,
        route:'./countries',
        submenu:null
    },
    {
        text:"ListView & Downloads",
        icon:faList,
        route:'./listView',
        submenu:null
    },
    {
        text:"Device Configuration",
        icon:faWrench,
        route:'./device-configuration',
        submenu:null
    }
];

@Injectable()
export class MenuService implements OnDestroy{
   
     
    menuItems:Array<IMenuItem>=initialMenuItems;
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

