import { Component } from "@angular/core";
import { ScreenService } from "../../services/screen.service";
import { MenuService } from "../../services/menu.service";
import { transition, animate, trigger, style } from "@angular/animations";

@Component({
    selector:'fw-header',
    templateUrl:'./header.component.html',
    styleUrls:['./header.component.css'],
    animations:[
        trigger('visibilityChanged',[
            transition(':enter',[ // enter is alias to void => * or no animation state to animation state
              style({opacity:0}),
              animate(250,style({oapcity:1}))  

            ]),
            transition(":leave",[// enter is alias to '* => void' or animation state to no animation state
                animate(1000,style({oapcity:0})) ])
        ])
    ]
    

})
export class HeaderComponent{
    menuIsVertical:boolean=false;
    popUpRight:number=0;
    popUpTop:number=60;
    constructor(private screenService:ScreenService,private menuService:MenuService){
     
        this.menuIsVertical=this.menuService.isVertical;
        

    }
   
}