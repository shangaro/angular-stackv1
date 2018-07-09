import { Component } from "@angular/core";
import { MenuService } from "../../services/menu.service";


@Component({
 selector:'fw-content',
 templateUrl:'./content.component.html',
 styleUrls:['./content.component.css']
})

export class ContentComponent{
    constructor(private menuService:MenuService){}
}