

// ///<reference path="../../../assets/Sirtrack_Filters.js"/>
// ///<reference path="../../../assets/Sirtrack.Container.js"/>
// ///<reference path="../../../assets/Sirtrack.Timeline.js"/>
declare var $:any;
declare var ko:any;
declare var Sirtrack_Filters:any;
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

@Component({
    selector:'fw-slider',
    templateUrl:'./jqslider.component.html',
    styleUrls:['./jqslider.component.html']
})
    

export class JqSliderComponent implements OnInit{
  number:number;
  observable:Observable<number>;
  renderDate(datesec:Date):string{
    if(datesec)
    return datesec.toUTCString();
    else 
      return "";
  }
  constructor(){
   
   

  }
  ngOnInit(){
    $(document).ready(function(){
      this.number=2;
      $( "#slider-range" ).slider({
        range: true,
        min: 0,
        max: 500,
        values: [ this.number, 300 ],
        slide: function( event, ui ) {
          $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
        },
        change:function(event,ui){
          console.log("**slider change triggered",ui);
        }
      });
      $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
        " - $" + $( "#slider-range" ).slider( "values", 1 ) );
  
     });
  }

  
  
  
}
