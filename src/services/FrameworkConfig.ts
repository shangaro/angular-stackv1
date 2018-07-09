import { Injectable } from "@angular/core";


export interface IconFiles{
    imageFile:any,
    alt:string,
    link:string
}
export interface IFrameworkConfigSettings{
    showLanguageSelector?:boolean,
    showUserControls?:boolean,
    showStatusBarBreakpoint?:number,
    socialIcons?: Array<IconFiles>
}

@Injectable()
export class FrameworkConfigService{

    showLanguageSelector=true;
    showUserControls=true;
    showStatusBarBreakpoint=0;
    socialIcons= new Array<IconFiles>();

    configure(settings:IFrameworkConfigSettings){
       // instance of an interface.. alternative to DI
        Object.assign(this,settings);
    }
}