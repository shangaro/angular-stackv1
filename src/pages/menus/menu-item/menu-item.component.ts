import { Input, Component, HostBinding } from "@angular/core";
import { IMenuItem, MenuService } from "../../../services/menu.service";
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
    selector:'fw-menu-item',
    templateUrl:'./menu-item.component.html',
    styleUrls:['./menu-item.component.css']
    
  
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