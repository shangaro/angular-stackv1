
import { Component, OnInit, ViewChild, Input, ViewChildren } from "@angular/core";
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
    t0:number;t1:number;
    markers:any;
    markerCluster:any;
    markersAmount:any;
    gridSize;
    minimumClusterSize;
    
    constructor(){

    }

    initializeMap(){
        var maps= require('@google/maps');
        console.log("*maps",maps);
       
      
    }

    
    

}


    
    

  
   
