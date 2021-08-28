import { Injectable } from "@angular/core";
import { Resolve , ActivatedRouteSnapshot, Event, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs/internal/Observable';
import { ServiceComplaint } from "../../../shered/models/complaints/servicecomplaint.model";
import { ComplaintsListService } from "../../complaintslist/complaintslist.service";

@Injectable()
export class ServiceComplaintResolver  
implements Resolve<ServiceComplaint>{
   
        constructor(private complaintsListService : ComplaintsListService){
          
        }
      
          resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ServiceComplaint> | Promise<ServiceComplaint> | ServiceComplaint{
      
                 console.log("resolver : " ,this.complaintsListService.getSelectedServiceComplaint());
                // console.log("resolver : " ,route.data);
                 
            
               return this.complaintsListService.getSelectedServiceComplaint();
            
            }

}