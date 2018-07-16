import { } from 'googlemaps';
import { Component, OnInit, ViewChild, Input, ViewChildren } from "@angular/core";
declare var google:any;
@Component({
    selector:'content-dashboard',
    templateUrl:'./dashboard.component.html',
    styleUrls:['./dashboard.component.css']
})
export class DashBoardComponent implements OnInit{
     
    @ViewChild('gmap')gmapElement:any;
    map:google.maps.Map;
    latitude:any;
    longitude:any;
   
    ngOnInit(): void { 

        var mapOptions={
            center: {lat:43.472285,lng:-80.544858},
            zoom:15
    
    
        };
        this.map=new google.maps.Map(this.gmapElement.nativeElement,mapOptions);
    }

  
   
}