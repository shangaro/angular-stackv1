import { Directive, ViewContainerRef,TemplateRef, Input, OnDestroy } from "@angular/core";
import { ScreenService } from "../services/screen.service";
import { Subscription } from "rxjs";

@Directive({selector:'[screenBelowLarge]'})
export class ScreenBelowLarge implements OnDestroy{
   
    private hasView:boolean=false;
    private screenSubscription:Subscription;
    constructor(private template:TemplateRef<Object>,
                private viewContainer:ViewContainerRef,
                private screenService:ScreenService){

       this.screenSubscription=this.screenService.resize$.subscribe(()=>this.onResize());


        }
    
    @Input()
    set screenBelowLarge(condition){

        condition=this.screenService.screenWidth < this.screenService.largeBreakpoint;

        if(condition && !this.hasView){

             // if there is no view then add one on a view container
             this.viewContainer.createEmbeddedView(this.template);
             this.hasView=true;

        } else if(!condition && this.hasView){
            this.viewContainer.clear();
            this.hasView=false;
            
        }

    }
    onResize(){
        this.screenBelowLarge=false;
    }
    ngOnDestroy(): void {
        this.screenSubscription.unsubscribe();
    }
}