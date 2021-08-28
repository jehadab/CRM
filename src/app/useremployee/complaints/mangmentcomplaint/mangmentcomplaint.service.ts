import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { pipe } from "rxjs";
import { Statics } from "../../../shered/statics.component";
 @Injectable()
 export class MangmentComplaintService {
     constructor(private http:HttpClient){

     }
    fetchSectionsAndRoles(rolesArray , sectionsNamesArray){
        this.http.get(Statics.API_HOST + "role/all" ).
        subscribe(pipe((resault : any)=>{
            resault.forEach(element => {
                rolesArray.push({id  : element.id ,name : element.name})
                
            });
            this.http.get(Statics.API_HOST + "department/all").
            subscribe(((resault : any) =>{
                // console.log(res.dep);
                
                resault.dep.forEach(element => {
                    sectionsNamesArray.push( element.name);
    
                });
            }))
         }))


    }
    sendForwardedComplaint(reqBody : {compID, newDep, newRole, employee}){
        this.http.post(Statics.API_HOST + ' /customer/foreword' , reqBody)
    }

    postAcceptReplay(mangmentComplaint){
        return this.http.post( Statics.API_HOST + "complaint/replay",mangmentComplaint)
    }


 }