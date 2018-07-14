import { Component, OnDestroy } from "@angular/core";
import { MenuService } from "../../../services/menu.service";
import { trigger, style, transition, animate } from "@angular/animations";

@Component({
    selector:'fw-menu',
    templateUrl:'./menu.component.html',
    styleUrls:['./menu.component.css'],
    animations:[
        trigger('visibilityChanged',[
            transition(':enter',[ // enter is alias to void => * or no animation state to animation state
              style({opacity:0}),
              animate(250,style({opacity:1}))  

            ]),
            transition(":leave",[// enter is alias to '* => void' or animation state to no animation state
                animate(1000,style({opacity:0})) ])
        ])
    ]
   
  
})
export class MenuComponent{
   

    constructor(private menuService:MenuService){

        
    }
    
}