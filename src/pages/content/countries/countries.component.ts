import { Component, OnInit } from "@angular/core";

@Component({
    selector:'content-countries',
    templateUrl:'./countries.component.html',
    styleUrls:['./countries.component.css']
})

export class CountriesComponent implements OnInit{

    ngOnInit(){
        console.log("navigation has reached countries page");
    }
}