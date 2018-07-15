import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { } from 'googlemaps';
@Component({
    selector:'content-settings',
    templateUrl:'./settings.component.html',
    styleUrls:['./settings.component.css']
})
export class SettingsComponent implements OnInit{

    mapOptions:any;
    map:google.maps.Map;
    @ViewChild('gmap') gmapElement:any;
    ngOnInit(): void {
        this.mapOptions={
            center:{lat:44.069815,lng:-79.427602},
            zoom:15
        }
        this.map= new google.maps.Map(this.gmapElement.nativeElement,this.mapOptions);
        
    }
    

}