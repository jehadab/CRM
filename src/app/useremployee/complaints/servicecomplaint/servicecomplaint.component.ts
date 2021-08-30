import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { ServiceComplaint } from 'src/app/shered/models/complaints/servicecomplaint.model';
import { Statics } from 'src/app/shered/statics.component';
import { EmployeeAuth } from '../../employeelogin/employeeauth.service';
import { ServiceComplaintService } from './servicecomplaintservice.service';

@Component({
  selector: 'app-servicecomplaint',
  templateUrl: './servicecomplaint.component.html',
  styleUrls: ['./servicecomplaint.component.css'],
})
export class ServicecomplaintComponent implements OnInit {

  noteText: String;
  isLoading: boolean = false;


  sectionsNames: { id: number, name: string }[] = [];
  roles: { id: number, name: string }[] = [];
  isForwarder = false;
  forwardRoleId = 6;
  roleValue;
  sectuinValue;

  isDecisionMaker = false;
  user: { role: number, email: string } = {
    role: 0,
    email: ""
  }


  public serviceComplaint: ServiceComplaint;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private serviceComplaintService: ServiceComplaintService,
    private employeeAuth: EmployeeAuth) {
  }

  ngOnInit(): void {
    this.route.data.subscribe((_data: Data) => {
      this.serviceComplaint = {
        id: _data.serviceComplaint.id,
        content: _data.serviceComplaint.content,
        name: _data.serviceComplaint.name,
        applyDate: _data.serviceComplaint.date,
        flow: _data.serviceComplaint.flow
      }
      console.log("data : ", _data);
      // console.log("flow : " ,this.serviceComplaint);
      this.employeeAuth.useremployee.pipe(take(1)).subscribe(user => {
        // this.user.email = user.email
        // this.user.role = user.role
        this.user.email = "fof@ss.n"
        this.user.role = 6
      })
      if (this.user.role == this.forwardRoleId) {
        this.serviceComplaintService.fetchSectionsAndRoles(this.roles, this.sectionsNames)
        this.isForwarder = true;

      }
      // console.log(this.mangmentComplaint);

      if (this.serviceComplaint.flow.currentstep == this.serviceComplaint.flow.stepscount) {
        this.isDecisionMaker = true;
      }



      // console.log(_data.serviceComplaint);

      //  console.log(this.serviceCompalint);
      // Complaint : id   , userid , status : int , data : JSON {title : string , discription : string } 
      // flow {  }


    })


  }
  forward() {

    this.serviceComplaintService.sendForwardedComplaint(
      { compID: this.serviceComplaint.id, newDep: this.sectuinValue, newRole: this.roleValue, employee: this.user.email });


  }
  accepted() {
    // this.isLoading = true ;
    // const currentreplay : number= this.serviceCompalint.flow.currentstep;
    // this.serviceCompalint.flow.steps[currentreplay].status = 1 ;
    // this.serviceCompalint.flow.steps[currentreplay].note = this.noteText.toString();

    let employeeEmail;
    this.employeeAuth.useremployee.pipe(take(1)).subscribe(user => {
      employeeEmail = user.email
    })
    // console.log(employeeEmail);

    const reqBody: { id: number, data: string, email: string, status: number } =
      { id: this.serviceComplaint.id, data: this.noteText.toString(), email: employeeEmail, status: 6 }
    // console.log(this.serviceCompalint);

    this.serviceComplaintService.postAcceptReplay(reqBody).subscribe((resault) => {

      console.log("resp ", resault);
      this.isLoading = false;
      this.router.navigate(['../../'], { relativeTo: this.route })

    }, errmsg => {
      console.log(errmsg);
      this.isLoading = false;

    });

  }
  rejected() {
    let employeeEmail;
    this.employeeAuth.useremployee.pipe(take(1)).subscribe(user => {
      employeeEmail = user.email
    })
    const reqBody: { id: number, data: string, email: string, status: number } =
      { id: this.serviceComplaint.id, data: this.noteText.toString(), email: employeeEmail, status: 5 }

    this.serviceComplaintService.postAcceptReplay(reqBody).subscribe(resault => {

      this.isLoading = false;
      this.router.navigate(['../../'], { relativeTo: this.route })


    }, errmsg => {
      console.log(errmsg);
      this.isLoading = false;


    })
  }
  deleteComplaint(){
    const reqBody: { id: number, data: string, email: string, status: number } =
      { id: this.serviceComplaint.id, data: this.noteText.toString(), email: this.user.email, status: 5 }

    this.serviceComplaintService.postAcceptReplay(reqBody).subscribe(resault => {

      this.isLoading = false;
      this.router.navigate(['../../'], { relativeTo: this.route })


    }, errmsg => {
      console.log(errmsg);
      this.isLoading = false;


    })

  }





}
