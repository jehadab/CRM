import { Injectable } from "@angular/core";
import { Resolve , ActivatedRouteSnapshot, Event, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs/internal/Observable';
import { EmployeeService } from "./employee.service";



@Injectable()
export class EmployeeSectionResolver implements Resolve<string>{
  constructor(private employeeService : EmployeeService){
    
  }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> | Promise<string> | string{

        //  console.log("resolver : " ,this.employeeService.getSectionName());
      
         return this.employeeService.getSectionName()
      
      }
}