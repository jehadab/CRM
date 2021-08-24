import { Injectable } from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http'
import { EmployeeAuth } from "./employeeauth.service"
import { exhaustMap, take } from 'rxjs/operators';
@Injectable()
export class EmployeeAuthInterceptorService {
    constructor(private authservice : EmployeeAuth) {
        
        
    }
    
    intercept(req : HttpRequest<any> , next : HttpHandler){
       return this.authservice.useremployee.pipe(take(1),exhaustMap(user => {
           if(!user){
               return next.handle(req);
           }
            const modifiedReq = req.clone(
                
                // {params : new HttpParams().set("x-auth-token",user._token)}
                {setHeaders : {
                    'x-auth-token':user._token
                }}
                )
                console.log(modifiedReq);
                

           return next.handle(modifiedReq)
        }))

    }
}