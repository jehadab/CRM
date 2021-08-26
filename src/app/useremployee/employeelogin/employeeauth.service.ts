import { HttpClient, HttpHeaders } from "@angular/common/http";
import  { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, pipe, Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { Statics } from "src/app/shered/statics.component";
import { EmpUserModel } from "../employeeuser.model";
@Injectable()
export class EmployeeAuth {
    constructor(private http : HttpClient,
        private router : Router){
        
    }
    
    useremployee = new BehaviorSubject<EmpUserModel>(null);
    user = new Subject<EmpUserModel>();
    login(email : String , password : String ){

        
        // console.log("cridets : " + email + password);
        
  
        return this.http.post<any>(
            Statics.API_HOST + "auth/employee",
            {
                email : email,
                 password : password

            }
            
        ).pipe(tap(resaultData =>{
            // console.log(resaultData);
            
            const expirationDate = new Date( new Date().getTime()*1000 +100) ;
            const user = new EmpUserModel(resaultData.user.email , resaultData.user.firstName , resaultData.token )
            const employeeuser = new EmpUserModel(resaultData.user.email , resaultData.user.firstName  , resaultData.token , resaultData.role )
            this.useremployee.next(employeeuser)
            this.user.next(user);
            //    console.log(user);
            
            // add enterceptor for all requests
        }))
    }
}