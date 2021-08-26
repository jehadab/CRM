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

  public mangmentComplaint : MangmentComplaint ;

  constructor(private router : Router,
    private route : ActivatedRoute ,
    private mangmentComplaintService : MangmentComplaintService,
    private employeeAuth : EmployeeAuth) {

    this.route.data.subscribe((_data : Data) => {
      this.mangmentComplaint = {
        id : _data.serviceComplaint.id,
        content : _data.serviceComplaint.content ,
        name : _data.serviceComplaint.name ,
        applyDate : _data.serviceComplaint.date ,
        flow : _data.serviceComplaint.flow  
      }
      console.log("flow : " ,this.mangmentComplaint);
      
   
      
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
     {id : this.mangmentComplaint.id , data : this.noteText.toString() , email : employeeEmail , status : 6}    
    // console.log(this.mangmentComplaint);
    
    this.mangmentComplaintService.postAcceptReplay(reqBody).subscribe((resault)=>{
      
       console.log("resp ",resault);
      this.isLoading = false ;
      this.router.navigate(['../../'] , {relativeTo : this.route})

     },errmsg=>{
       console.log(errmsg);
       this.isLoading = false;
      
     }) ;

  }
  rejected(){
    let employeeEmail ;
    this.employeeAuth.useremployee.pipe(take(1)).subscribe(user=>{
     employeeEmail = user.email
   })
    const reqBody : { id : number , data : string , email : string , status : number } =
     {id : this.mangmentComplaint.id , data : this.noteText.toString() , email : employeeEmail , status : 5}    
  
    this.mangmentComplaintService.postAcceptReplay(reqBody).subscribe(resault => {
      
      this.isLoading = false ;
      this.router.navigate(['../../'] , {relativeTo : this.route})


    }, errmsg => {
      console.log(errmsg);
       this.isLoading = false;
      

    })
  }


}
