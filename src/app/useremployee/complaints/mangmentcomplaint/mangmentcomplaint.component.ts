import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { MangmentComplaint } from 'src/app/shered/models/complaints/mangmentcomplaint.model';
import { EmployeeAuth } from '../../employeelogin/employeeauth.service';
import { MangmentComplaintService } from './mangmentcomplaint.service';


@Component({
  selector: 'app-mangmentcomplaint',
  templateUrl: './mangmentcomplaint.component.html',
  styleUrls: ['./mangmentcomplaint.component.css'],
  
})

export class MangmentcomplaintComponent implements OnInit {
  noteText: String;
  isLoading: boolean = false;

  sectionsNames: {id : number , name : string  }[] = [];
  roles: { id: number, name: string }[] = [];
  isForwarder = false;
  forwardRoleId = 6;
  roleValue ;
  sectuinValue ;

  isDecisionMaker = false ;
  
  public mangmentComplaint: MangmentComplaint;
  user: { role: number, email: string } = {
    role: 0,
    email: ""
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private mangmentComplaintService: MangmentComplaintService,
    private employeeAuth: EmployeeAuth) {     

  }

  ngOnInit(): void { 
    this.route.data.subscribe((_data: Data) => {
      this.mangmentComplaint = {
        id: _data.managementComplaint.id,
        content: _data.managementComplaint.content,
        name: _data.managementComplaint.name,
        applyDate: _data.managementComplaint.applyDate,
        flow: _data.managementComplaint.flow
      }

    })


    this.employeeAuth.useremployee.pipe(take(1)).subscribe(user => {
      // this.user.email = user.email
      // this.user.role = user.role
      this.user.email = "fof@ss.n"
      this.user.role = 6
    })
    if (this.user.role == this.forwardRoleId) {
      this.mangmentComplaintService.fetchSectionsAndRoles(this.roles, this.sectionsNames)
      this.isForwarder = true;

    }
    console.log(this.mangmentComplaint);
    
    if(this.mangmentComplaint.flow.currentstep == this.mangmentComplaint.flow.stepscount){
      this.isDecisionMaker = true ;
    }
    
    console.log(this.user);
  }
  accepted() {
    // this.isLoading = true ;
    // const currentreplay : number= this.mangmentComplaint.flow.currentstep;
    // this.mangmentComplaint.flow.steps[currentreplay].status = 1 ;
    // this.mangmentComplaint.flow.steps[currentreplay].note = this.noteText.toString();

    // console.log(employeeEmail);

    const reqBody: { id: number, data: string, email: string, status: number } =
      { id: this.mangmentComplaint.id, data: this.noteText.toString(), email: this.user.email, status: 6 }
    // console.log(this.mangmentComplaint);

    this.mangmentComplaintService.postAcceptReplay(reqBody).subscribe((resault) => {

      console.log("resp ", resault);
      this.isLoading = false;
      this.router.navigate(['../../'], { relativeTo: this.route })

    }, errmsg => {
      console.log(errmsg);
      this.isLoading = false;

    });

  }
  forward(){

    this.mangmentComplaintService.sendForwardedComplaint({compID : this.mangmentComplaint.id , newDep : this.sectuinValue , newRole : this.roleValue , employee  : this.user.email});
    

  }
  rejected() {
    const reqBody: { id: number, data: string, email: string, status: number } =
      { id: this.mangmentComplaint.id, data: this.noteText.toString(), email: this.user.email, status: 5 }

    this.mangmentComplaintService.postAcceptReplay(reqBody).subscribe(resault => {

      this.isLoading = false;
      this.router.navigate(['../../'], { relativeTo: this.route })


    }, errmsg => {
      console.log(errmsg);
      this.isLoading = false;


    })
  }
  deleteComplaint(){
    const reqBody: { id: number, data: string, email: string, status: number } =
      { id: this.mangmentComplaint.id, data: this.noteText.toString(), email: this.user.email, status: 5 }

    this.mangmentComplaintService.postAcceptReplay(reqBody).subscribe(resault => {

      this.isLoading = false;
      this.router.navigate(['../../'], { relativeTo: this.route })


    }, errmsg => {
      console.log(errmsg);
      this.isLoading = false;


    })

  }


}
