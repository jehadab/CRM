import { Injectable } from '@angular/core';
import { HttpClient  } from "@angular/common/http";
import { map , tap } from "rxjs/operators";
import { EmpUserModel } from '../employeeuser.model';
import { Complaint } from '../../shered/models/Complaint.model';
import {MangmentComplaint } from '../../shered/models/complaints/mangmentcomplaint.model';

@Injectable()
export class ComplaintsListService {
    constructor(private http : HttpClient){

    }
    private selectedComplaint : MangmentComplaint ;

    fetchComplaints(mangmentComplements : Complaint[] , serviceComplements : Complaint[]){
        return this.http.get(
            'https://crmproject-558a8-default-rtdb.europe-west1.firebasedatabase.app/complaints/services_complaint.JSON')
            .pipe(tap((res : any ) => { /// TYPE ANY
                console.log(res);
                
                // mangmentComplements = res.mangmentComplements;
                // serviceComplements =  res.serviceComplements;
        },errorMassage =>{
            console.log("error " + errorMassage);
            
        }))
        

    }
    setSelectedComplaint (complaitn : MangmentComplaint ){

        this.selectedComplaint = complaitn ; 
    } 
    getSelectedComplaint () : MangmentComplaint {

        return this.selectedComplaint 
        
    }


}