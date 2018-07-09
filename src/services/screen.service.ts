import { Injectable,HostListener } from "@angular/core";
import {Subject} from 'rxjs';

@Injectable()
export class ScreenService
{

    private resizeSource=new Subject<null>();
    resize$= this.resizeSource.asObservable();

    largeBreakpoint=800; // standard size is 800
    screenWidth=1000;
    screenHeight=800;

    constructor(){

        try{
            window.addEventListener('resize',(event)=>
            this.onResize(event));
        }
        catch(e){

            // we are going with default screen dimensions
        }

    }
    onResize($event){
        this.screenWidth=window.innerWidth;
        this.screenHeight=window.innerHeight;
        this.resizeSource.next();
    }
    isLarge():boolean{
        return this.screenWidth >=this.largeBreakpoint;
    }

}