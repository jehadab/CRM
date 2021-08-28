import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Statics } from 'src/app/shered/statics.component';

@Injectable()
export class ServiceComplaintService {

    constructor(private http : HttpClient){

    }
    postAcceptReplay(mangmentComplaint) {
        return this.http.post(Statics.API_HOST + "complaint/replay", mangmentComplaint)
    }

}



