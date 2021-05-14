import { Injectable } from "@angular/core";
import { Resolve , ActivatedRouteSnapshot, Event, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs/internal/Observable';
import { SectionService } from "./section.service";



@Injectable()
export class ServiceResolver implements Resolve<string[]>{
  constructor(private sectionService : SectionService){
    
  }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string[]> | Promise<string[]> | string[]{

        // console.log("resolver : "+this.sectionService.getSectionNameArray());
      
         return this.sectionService.getSectionNameArray()
      
      }
}