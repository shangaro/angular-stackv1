import { Component, Input } from "@angular/core";
import { MenuService, IMenuItem } from "../../../services/menu.service";
import { trigger, transition, style, animate } from "@angular/animations";

@Component({
    selector:'fw-popup-menu',
    templateUrl:'./popup-menu.component.html',
    styleUrls:['./popup-menu.component.css'],
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
export class PopupMenuComponent{
    @Input() menu:Array<IMenuItem>;
    constructor(private menuService:MenuService){
    }

    TogglePopUpMenu(){
        this.menuService.isSmallScreenMenu=!this.menuService.isSmallScreenMenu;
    }
}