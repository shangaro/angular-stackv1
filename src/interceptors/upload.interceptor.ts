import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpProgressEvent, HttpEventType, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable} from "rxjs";
import{concat} from "rxjs/observable/concat";
import {of} from "rxjs/observable/of";
import{delay} from "rxjs/operators/delay";

@Injectable()
export class UploadInterceptor implements HttpInterceptor{
    intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
        if(req.url==='saveUrl'){
            const events:Observable<HttpEvent<any>>[]=[0,30,60,100].map((x)=>
                of(<HttpProgressEvent>{
                    type:HttpEventType.UploadProgress,
                    loaded:x,
                    total:100
                }).pipe(delay(1000)));
            
            const success=of(new HttpResponse({status:200})).pipe(delay(1000)); // this one should come from backend api
            events.push(success);
            return concat(...events);
        }

        if(req.url ==="removeUrl"){
            return of(new HttpResponse({status:200}));
        }
        return next.handle(req);
    }
}