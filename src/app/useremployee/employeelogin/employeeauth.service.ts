import { HttpClient } from "@angular/common/http";
import  { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { EmpUserModel } from "../employeeuser.model";
@Injectable()
export class EmployeeAuth {
    constructor(private http : HttpClient,
        private router : Router){
        
    }
    useremployee = new BehaviorSubject<EmpUserModel>(null);
    user = new Subject<EmpUserModel>();
    login(email : String , password : String ){
        
        
        return this.http.post<EmpUserModel>(
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBWhKMW-6a7Q8Pb_PaKfE9tv0PGkZLoeME",
            {
                email : email,
                password : password,

            }
        ).pipe(tap(resaultDate =>{
            const expirationDate = new Date( new Date().getTime()*1000 +100) ;
            const user = new EmpUserModel(email , password , resaultDate.token, expirationDate )
            const employeeuser = new EmpUserModel(email , password , resaultDate.token , expirationDate)
            this.useremployee.next(employeeuser)
            this.user.next(user);
            // console.log(user);
            
            // add enterceptor for all requests
        }))
    }
}