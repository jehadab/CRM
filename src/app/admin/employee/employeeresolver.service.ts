import { Injectable } from "@angular/core";
import { Resolve , ActivatedRouteSnapshot, Event, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs/internal/Observable';
import { EmployeeService } from "./employee.service";



@Injectable()
export class EmployeeSectionResolver implements Resolve<{id : number , name :  string}>{
  constructor(private employeeService : EmployeeService){
    
  }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{id : number , name :  string}> | Promise<{id : number , name :  string}> | {id : number , name :  string}{

        //  console.log("resolver : " ,this.employeeService.getSectionName());
      
         return this.employeeService.getSectionName()
      
      }
}