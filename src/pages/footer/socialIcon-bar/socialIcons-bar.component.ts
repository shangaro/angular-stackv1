import { Component } from "@angular/core";
import { FrameworkConfigService } from "../../../services/FrameworkConfig";
import { IconServiceProvider } from "../../../services/icon.service";
import { ScreenService } from "../../../services/screen.service";
@Component({
    selector:'fw-socialIcons-bar',
    templateUrl:'./socialIcons-bar.component.html',
    styleUrls:['./socialIcons-bar.component.css']
})
export class SocialIconBarsComponent{
    iconStore:any={};
    constructor(public frameworkConfigService:FrameworkConfigService,public screenService:ScreenService){
       
    }
}