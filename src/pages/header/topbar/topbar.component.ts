import { Component } from "@angular/core";
import { FrameworkConfigService } from "../../../services/FrameworkConfig";
import { MenuService } from "../../../services/menu.service";
import { UserApi } from "../../../shared/class-interface/userApi";


@Component({

    selector:'fw-topbar',
    templateUrl:'./topbar.component.html',
    styleUrls:['./topbar.component.css']
})
export class TopBarComponent{

    private username:string;
    constructor(private frameworkConfigService:FrameworkConfigService,
                private menuService:MenuService,private userApi:UserApi){

        this.username=this.userApi.getUserName()==undefined ? "":this.userApi.getUserName();
    }

    signOut($event){
        this.userApi.signOut();
    }
}