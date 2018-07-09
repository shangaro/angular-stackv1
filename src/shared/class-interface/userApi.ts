import { Observable } from "rxjs";

export abstract class UserApi{
    
    getUserName:()=>string;
    signIn:(username:string,password:string,rememberMe:boolean)=>Observable<any>;

    
    signOut:() =>Observable<any>;
    //register
    //forgot password
}