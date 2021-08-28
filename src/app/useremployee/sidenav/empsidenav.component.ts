import { Component, Input } from "@angular/core";
import { take } from "rxjs/operators";
import { EmployeeAuth } from "../employeelogin/employeeauth.service";

@Component({

    selector : "emp-sidenav",
    templateUrl : "./empsidenav.component.html",
    styleUrls : ["./empsidenav.component.css"]
})
export class EmployeeSideNav {
    sidenav : HTMLElement ;
    employeeName : String;
    constructor(private employeeAuth : EmployeeAuth){

    }
    
    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.sidenav = document.getElementById('sidebar');
        let employeeEmail ;
        this.employeeAuth.useremployee.pipe(take(1)).subscribe(user=>{
            // console.log(user);
            
        this.employeeName = user.name
   })
    }
    toggleSidenav(event : HTMLElement ){
        if( this.sidenav.classList.contains('active') ){
            this.sidenav.classList.remove('active');
            return;
        }
        this.sidenav.classList.add('active')


    }
    

}