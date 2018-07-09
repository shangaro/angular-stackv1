import { Component } from "@angular/core";
import { FrameworkConfigService } from "../../../services/FrameworkConfig";
import { MenuService } from "../../../services/menu.service";


@Component({

    selector:'fw-topbar',
    templateUrl:'./topbar.component.html',
    styleUrls:['./topbar.component.css']
})
export class TopBarComponent{


    constructor(private frameworkConfigService:FrameworkConfigService,
                private menuService:MenuService){

        
    }
}