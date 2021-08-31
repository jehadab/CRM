import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe } from 'rxjs';
import { Statics } from 'src/app/shered/statics.component';

@Injectable()
export class ServiceComplaintService {

    constructor(private http : HttpClient){

    }
    postAcceptReplay(mangmentComplaint) {
        return this.http.post(Statics.API_HOST + "complaint/replay", mangmentComplaint)
    }


    deleteComplaint(id){
        return this.http.post(Statics.API_HOST + "complaint/remove" , id )

    }

    fetchSectionsAndRoles(rolesArray , sectionsNamesArray){
        this.http.get(Statics.API_HOST + "role/all" ).
        subscribe(pipe((resault : any)=>{
            resault.forEach(element => {
                rolesArray.push({id  : element.id ,name : element.name})
                
            });
            this.http.get(Statics.API_HOST + "department/all").
            subscribe(((resault : any) =>{
                //  console.log(resault);
                
                resault.forEach(element => {

                    sectionsNamesArray.push( {id : element.id, name : element.name});
    
                });
            }))
         }))


    }
    sendForwardedComplaint(reqBody : {compID, newDep, newRole, employee}){
        console.log(reqBody);
        
        return this.http.post(Statics.API_HOST + 'complaint/customer/forward' , reqBody)
    }

}



