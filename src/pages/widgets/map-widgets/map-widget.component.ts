import { Component } from "@angular/core";

@Component({
    selector:'map-widget',
    templateUrl:'./map-widget.component.html',
    styleUrls:['./map-widget.component.css']
})
export class MapWidgetComponent{
    mapTypes:ISelect[]=[
        { value:"googlemap",viewValue:"Google Map"},
        {value:"mapbox", viewValue:"MapBox"}
    ];
    plotTypes:ISelect[]=[
        {value:"markers",viewValue:"Markers Only"},
        {value:"path", viewValue:"Path Only"},
        {value:"path&markers",viewValue:"Path With Markers"}
    ];
}

export interface ISelect{
    viewValue:string;
    value:string;
}