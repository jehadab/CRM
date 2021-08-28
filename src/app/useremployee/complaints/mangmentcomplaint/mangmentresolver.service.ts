import { Injectable } from "@angular/core";
import { Resolve , ActivatedRouteSnapshot, Event, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs/internal/Observable';
import { MangmentComplaint } from "../../../shered/models/complaints/mangmentcomplaint.model";
import { ComplaintsListService } from "../../complaintslist/complaintslist.service";

import { UseremployeeComponent } from "../../useremployee.component";
import { UserEmployeeServive } from "../../useremployee.service";



@Injectable()
export class mangmentresolver 
 implements Resolve<MangmentComplaint>{
  constructor(private complaintsListService : ComplaintsListService){
    
  }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MangmentComplaint> | Promise<MangmentComplaint> | MangmentComplaint{

        //  console.log("resolver : "+this.complaintsListService.getSelectedComplaint());
      
         return this.complaintsListService.getSelectedManagementComplaint();
      
      }
}