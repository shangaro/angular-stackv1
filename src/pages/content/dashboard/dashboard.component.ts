import { Component, OnInit } from "@angular/core";

@Component({
    selector:'content-dashboard',
    templateUrl:'./dashboard.component.html',
    styleUrls:['./dashboard.component.css']
})
export class DashBoardComponent implements OnInit{
    ngOnInit(): void {
        console.log("navigation has reached dashboard");
    }

  
   
}