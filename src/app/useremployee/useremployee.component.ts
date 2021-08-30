import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Complaint } from "../shered/models/Complaint.model"
import { EmployeeAuth } from './employeelogin/employeeauth.service';
import { UserEmployeeServive } from './useremployee.service';
import  { MangmentComplaint } from '../shered/models/complaints/mangmentcomplaint.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MangmentcomplaintComponent } from './complaints/mangmentcomplaint/mangmentcomplaint.component';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-useremployee',
  templateUrl: './useremployee.component.html',
  styleUrls: ['./useremployee.component.css']
})


export class UseremployeeComponent implements OnInit {

  constructor(private employeeService: UserEmployeeServive,
              private emplyeeAuth : EmployeeAuth , 
              private router : Router ,
              private activeRoute : ActivatedRoute ) { 
    //  this.employeeService.fetchComplaints(this.mangmentComplaints, this.serviceComplaints).subscribe(resault =>{

    //  },errorMessage  => {
        
    //  })
  }


  ngOnInit(): void {
    this.router.navigate(["employee/inbox"] )


    
    
    
  }


 

}
