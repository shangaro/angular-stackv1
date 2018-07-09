import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
    selector:'content-settings',
    templateUrl:'./settings.component.html',
    styleUrls:['./settings.component.css']
})
export class SettingsComponent implements OnInit,OnDestroy{
    ngOnDestroy(): void {
        console.log("the navigation left settings page");
    }

    ngOnInit(){
        console.log("the navigation has reached settings page");
    }

}