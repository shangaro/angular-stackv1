declare var $:any;
import { Component } from "@angular/core";

@Component({
    selector:'fw-slider',
    templateUrl:'./jqslider.component.html',
    styleUrls:['./jqslider.component.html']
})
export class JqSliderComponent{
    
   constructor(){

    $(document).ready(function(){

        var range=$("#slider-range");
        range.slider({
            range: true,
      min: 0,
      max: 500,
      values: [ 75, 300 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
    " - $" + $( "#slider-range" ).slider( "values", 1 ) );
        });
   }
}