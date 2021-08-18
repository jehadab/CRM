import { Injectable } from '@angular/core';
import { HttpClient  } from "@angular/common/http";
import { map , tap } from "rxjs/operators";
import { EmpUserModel } from './employeeuser.model';
import { Complaint } from '../shered/models/Complaint.model';
import {MangmentComplaint } from '../shered/models/complaints/mangmentcomplaint.model';


@Injectable({

    providedIn: 'root',
})

export class UserEmployeeServive {

    constructor(private http : HttpClient){

    }



}