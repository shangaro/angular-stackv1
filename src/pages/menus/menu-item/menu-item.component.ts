import { Input, Component, HostBinding } from "@angular/core";
import { IMenuItem, MenuService } from "../../../services/menu.service";
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
    selector:'fw-menu-item',
    templateUrl:'./menu-item.component.html',
    styleUrls:['./menu-item.component.css'],
    animations:[
        trigger('visibilityChanged',[
            transition(':enter',[ // enter is alias to void => * or no animation state to animation state
              style({opacity:0}),
              animate(250,style({oapcity:1}))  

            ]),
            transition(":leave",[// enter is alias to '* => void' or animation state to no animation state
                animate(100,style({oapcity:0})) ])
        ])
    ]
  
})
export class MenuItemComponent{
 @Input() item:IMenuItem;
 @HostBinding('class.parent-is-popup')
 @Input() parentIsPopup=true;
 isActiveRoute:boolean=false;
 mouseInItem:boolean=false;
 mouseInPopup=false;
 popupLeft=0;
 popupTop=34;
 constructor(private menuService:MenuService){

 }
}