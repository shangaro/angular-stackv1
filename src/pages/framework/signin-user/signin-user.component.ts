import { Component, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { UserService } from "../../../app/user.service";
import { UserApi } from "../../../shared/class-interface/userApi";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
    selector:'fw-signin-user',
    templateUrl:'./signin-user.component.html',
    styleUrls:['./signin-user.component.css']
})

export class SignInComponent implements OnDestroy{
    subscription:Subscription;
    
    formErrorMessage:string;
    submitting:boolean=false;
    formError:boolean=false;
    constructor( private userApi:UserApi,private router:Router){
        
    }

    
    onSubmit(signInForm:NgForm){
        if(signInForm.valid){
            console.log("submitting ..", signInForm);
            let userData= this.userApi.signIn(signInForm.value.username,signInForm.value.password,signInForm.value.rememberMe);
             this.subscription=userData.subscribe((data)=>{
                    console.log("got valid data",data);
                    this.router.navigate(['./authenticated']);
                },
            (err)=>{
                this.submitting=false;
                console.log('got error',err);
                this.formErrorMessage=err;
                this.formError=true;

            });
            
        }
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
