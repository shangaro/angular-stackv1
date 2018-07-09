import { Component } from "@angular/core";

@Component({
    selector:'fw-signin-user',
    templateUrl:'./signin-user.component.html',
    styleUrls:['./signin-user.component.css']
})

export class SignInComponent{
    formError:string;
    submitting:boolean=false;
    constructor(){
        
    }
}