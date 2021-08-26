import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Statics } from "../../../shered/statics.component";
 @Injectable()
 export class MangmentComplaintService {
     constructor(private http:HttpClient){

     }

    postAcceptReplay(mangmentComplaint){
        return this.http.post( Statics.API_HOST + "complaint/replay",mangmentComplaint)
    }


 }