import { Component, ViewChild, OnInit } from "@angular/core";
import { MatTableDataSource, MatPaginator } from "../../../../node_modules/@angular/material";

@Component({
    selector:"settings-table",
    templateUrl:"./settings-table.component.html",
    styleUrls:['./settings-table.component.css']   
})
export class SettingsTableComponent implements OnInit{
   
    dataSource=new MatTableDataSource<IMapData>(mapData);
    @ViewChild(MatPaginator) paginator:MatPaginator;
    columnHeaders:string[]=['Name','ID'];
    ngOnInit(): void {
        this.dataSource.paginator=this.paginator;
    }
}


export interface IMapData{
    Name:string;
    ID:number;
    GPS:number;
    Sen:number;
    Alrt:number;
    Prx:number;
    LatestFix:string;
}

const mapData:IMapData[]=[
    {
        Name:"testcoller",
        ID:1,
        LatestFix:"2017-2-23",
        Sen:34,
        Alrt:456,
        Prx:23,
        GPS:2454
    },
    {
        Name:"testcoller",
        ID:1,
        LatestFix:"2017-2-23",
        Sen:34,
        Alrt:456,
        Prx:23,
        GPS:2454
    }

]