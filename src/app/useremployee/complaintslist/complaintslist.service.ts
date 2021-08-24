import { Injectable } from '@angular/core';
import { HttpClient  } from "@angular/common/http";
import { map , tap } from "rxjs/operators";
import { EmpUserModel } from '../employeeuser.model';
import { Complaint } from '../../shered/models/Complaint.model';
import {MangmentComplaint } from '../../shered/models/complaints/mangmentcomplaint.model';
import { Statics } from 'src/app/shered/statics.component';
import { ServiceComplaint } from "../../shered/models/complaints/servicecomplaint.model";

@Injectable()
export class ComplaintsListService {
    constructor(private http : HttpClient){

    }
    private selectedComplaint : MangmentComplaint ;
    
    ServiceComplaint : ServiceComplaint = {
        id : 1 ,
        content : "",
        applyDate : new Date()
    }

    fetchComplaints( serviceComplements : Complaint[]){
       
        return this.http.get(
            Statics.API_HOST + "complaint/services/get").pipe(tap(resault => {

                for(let i in resault){
                    
                    
                }
            }))
           
        

    }
    setSelectedComplaint (complaitn : MangmentComplaint ){

        this.selectedComplaint = complaitn ; 
    } 
    getSelectedComplaint () : MangmentComplaint {

        return this.selectedComplaint 
        
    }


}