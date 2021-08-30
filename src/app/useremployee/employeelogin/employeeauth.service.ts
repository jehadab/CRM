import { HttpClient, HttpHeaders } from "@angular/common/http";
import  { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, pipe, Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { Statics } from "src/app/shered/statics.component";
import { __values } from "tslib";
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
            // const user = new EmpUserModel(resaultData.user.email , resaultData.user.firstName , resaultData.token )
            const employeeuser = new EmpUserModel(resaultData.user.email , resaultData.user.firstName  , resaultData.token , resaultData.user.role )
            this.useremployee.next(employeeuser)
            
            localStorage.setItem("userData" , JSON.stringify(employeeuser))
            
            // add enterceptor for all requests
        }))
    }
    onLogout(){
        localStorage.clear()
        localStorage.removeItem['userData']
        this.useremployee.next(null);
        this.router.navigate(['employeelogin']);
    }
    autoLogin(){
        
        const savedUser : {
            email : string , 
            name : string ,
            _token : string ,
            role : number
        } = JSON.parse(localStorage.getItem('userData'))
        // console.log('native' , JSON.parse( localStorage.getItem('userData')));
        // console.log('email' , savedUser);
        // console.log('autologin' , savedUser);



        if(!savedUser){
            // console.log('usernull');
            
            return
        }
        const loadedUser : EmpUserModel = new EmpUserModel(savedUser.email , savedUser.name , savedUser._token ,savedUser.role );
        // console.log('loadedUser', loadedUser);
        
        if(loadedUser._token)
        {
            // console.log('emited');
            
            this.useremployee.next(loadedUser);
        }


    }
    private setRole(roleNumber : number) {
        switch (roleNumber) {
            case 0:
                return ''
            case 1:
                return ''
            case 2:
                return ''
            case 3:
                return ''
            case 4:
                return ''
            default: return ""

        }
    }
}