import { Component } from "@angular/core";
import { ScreenService } from "../../services/screen.service";
import { MenuService } from "../../services/menu.service";

@Component({
    selector:'fw-header',
    templateUrl:'./header.component.html',
    styleUrls:['./header.component.css']

})
export class HeaderComponent{
    menuIsVertical:boolean=false;
    popUpRight:number=0;
    popUpTop:number=54;
    constructor(private screenService:ScreenService,private menuService:MenuService){
     
        this.menuIsVertical=this.menuService.isVertical;
        

    }
   
}