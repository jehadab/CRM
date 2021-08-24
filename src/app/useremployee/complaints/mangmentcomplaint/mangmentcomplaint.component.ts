import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { MangmentComplaint } from 'src/app/shered/models/complaints/mangmentcomplaint.model';
import { EmployeeAuth } from '../../employeelogin/employeeauth.service';
import { MangmentComplaintService } from './mangmentcomplaint.service';

@Component({
  selector: 'app-mangmentcomplaint',
  templateUrl: './mangmentcomplaint.component.html',
  styleUrls: ['./mangmentcomplaint.component.css']
})
export class MangmentcomplaintComponent implements OnInit {
  noteText : String ;
  isLoading : boolean = false ;

  public mangmentComplaint : MangmentComplaint = {
    id : 0 ,
    content : "",
    name : "",
    applyDate : new Date ()

  }; 

  constructor(private router : Router,
    private route : ActivatedRoute ,
    private mangmentComplaintService : MangmentComplaintService,
    private employeeAuth : EmployeeAuth) {

    this.route.data.subscribe((_data : Data) => {
   
      this.mangmentComplaint.id = _data.serviceComplaint.id
      this.mangmentComplaint.content = _data.serviceComplaint.content
      this.mangmentComplaint.name = _data.serviceComplaint.name
      this.mangmentComplaint.applyDate = _data.serviceComplaint.date;
      
      this.mangmentComplaint.flow = _data.serviceComplaint.flow;
      
      // console.log(_data.serviceComplaint);
      
      //  console.log(this.mangmentComplaint);
      // Complaint : id   , userid , status : int , data : JSON {title : string , discription : string } 
      // flow {  }

      
    })

   }

  ngOnInit(): void {

  }
  accepted()
  {
    // this.isLoading = true ;
    // const currentreplay : number= this.mangmentComplaint.flow.currentstep;
    // this.mangmentComplaint.flow.steps[currentreplay].status = 1 ;
    // this.mangmentComplaint.flow.steps[currentreplay].note = this.noteText.toString();
    
    let employeeEmail ;
     this.employeeAuth.useremployee.pipe(take(1)).subscribe(user=>{
      employeeEmail = user.email
    })
    // console.log(employeeEmail);
    
    const reqBody : { id : number , data : string , email : string , status : number } =
     {id : 5 , data : this.noteText.toString() , email : employeeEmail , status : 1}
    console.log(reqBody);
    
    // console.log(this.mangmentComplaint);
    
    this.mangmentComplaintService.postAcceptReplay(reqBody).subscribe((resault)=>{
      
      console.log(resault);
      this.isLoading = false ;
      this.router.navigate(['../../'] , {relativeTo : this.route})

     },errmsg=>{
       console.log(errmsg);
       this.isLoading = false;
      
     }) ;

  }
  rejected(){
    const currentReplay : number = this.mangmentComplaint.flow.currentstep;
    this.mangmentComplaint.flow.steps[currentReplay].status = 0 ; 
    this.mangmentComplaint.flow.steps[currentReplay].note = this.noteText.toString();


    this.mangmentComplaintService.postAcceptReplay(this.mangmentComplaint).subscribe(resault => {

    }, errmsg => {

    })
  }


}
