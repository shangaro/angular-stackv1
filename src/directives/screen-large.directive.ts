import { Directive, ViewContainerRef,TemplateRef, Input, OnDestroy } from "@angular/core";
import { ScreenService } from "../services/screen.service";
import { Subscription } from "rxjs";


@Directive({selector:'[screenLarge]'})
export class ScreenLarge implements OnDestroy{
    

    private hasView= false;
    private screenSubscription:Subscription;

    constructor(private viewContainer:ViewContainerRef,
                private template:TemplateRef<Object>,
                private screenService:ScreenService){

       this.screenSubscription=screenService.resize$.subscribe(()=>this.onResize());

    }

    // pipes the value from html metadata to class instance
    @Input()
    set screenLarge(condition){

        condition=this.screenService.screenWidth>=this.screenService.largeBreakpoint;

        if(condition && !this.hasView){

            this.hasView=true;
            this.viewContainer.createEmbeddedView(this.template);// puts the element on the dom
        }else if(!condition && this.hasView){
            this.hasView=false;
            this.viewContainer.clear(); // takes element off the DOM

        }
    }

    onResize(){
        // trigger the setter
        this.screenLarge=false;
    }

    ngOnDestroy(): void {
        this.screenSubscription.unsubscribe();
    }
    
}
