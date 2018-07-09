import { Component, Input } from "@angular/core";
import { MenuService, IMenuItem } from "../../../services/menu.service";
import { trigger, transition, style, animate } from "@angular/animations";

@Component({
    selector:'fw-popup-menu',
    templateUrl:'./popup-menu.component.html',
    styleUrls:['./popup-menu.component.css'],
    
})
export class PopupMenuComponent{
    @Input() menu:Array<IMenuItem>;
    constructor(private menuService:MenuService){
    }

    TogglePopUpMenu(){
        this.menuService.isSmallScreenMenu=!this.menuService.isSmallScreenMenu;
    }
}