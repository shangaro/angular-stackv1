import { Injectable } from "@angular/core";
import { UserApi } from "../shared/class-interface/userApi";
import { Observable,of, from } from "rxjs";
import { Router } from "@angular/router";

@Injectable()

export class UserService implements UserApi{
   
    private username:string;
    
    getUserName(){
     return this.username;   
    }
    signOut():Observable<any>{
        this.isAuthenticated=false;
        this.router.navigate(['./sigin']);
        return of({});   // returning empty observable;
    }
    isAuthenticated: boolean=false;
    credentials:any={};
    
    constructor(private router:Router){}
    signIn(username:string,password:string,rememberMe:boolean):Observable<any>{
        this.username=username;
        console.log('UserService.signIn:' + username + ' '+password + ' '+ rememberMe);
        this.isAuthenticated=true;
        this.credentials={
            username:username,
            password:password,
            rememberMe:rememberMe
        };
        console.log('credentials :',this.credentials);
        
        
        return of(this.credentials); // note: Observable.of("") works no longer in angular 5 use of()
    }

}