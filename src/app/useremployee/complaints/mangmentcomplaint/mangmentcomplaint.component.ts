import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { MangmentComplaint } from 'src/app/shered/models/complaints/mangmentcomplaint.model';
import { MangmentComplaintService } from './mangmentcomplaint.service';

@Component({
  selector: 'app-mangmentcomplaint',
  templateUrl: './mangmentcomplaint.component.html',
  styleUrls: ['./mangmentcomplaint.component.css']
})
export class MangmentcomplaintComponent implements OnInit {
  noteText : String ;

  public mangmentComplaint : MangmentComplaint = {
    id : 0 ,
    content : "",
    name : "",
    applyDate : new Date ()

  }; 

  constructor(private route : ActivatedRoute ,
    private mangmentComplaintService : MangmentComplaintService) {
    this.route.data.subscribe((_data : Data) => {
   
      this.mangmentComplaint.id = _data.serviceComplaint.id
      this.mangmentComplaint.content = _data.serviceComplaint.content
      this.mangmentComplaint.name = _data.serviceComplaint.name
      this.mangmentComplaint.applyDate = _data.serviceComplaint.date;
      
      this.mangmentComplaint.flow = _data.serviceComplaint.flow;
      
      console.log(_data.serviceComplaint);
      
      // console.log(this.mangmentComplaint);
      // Complaint : id   , userid , status : int , data : JSON {title : string , discription : string } 
      // flow {  }

      
    })

   }

  ngOnInit(): void {

  }
  accepted()
  {
    const currentreplay : number= this.mangmentComplaint.flow.currentstep;
    this.mangmentComplaint.flow.steps[currentreplay].rejected = false ;
    this.mangmentComplaint.flow.steps[currentreplay].note = this.noteText.toString();

    this.mangmentComplaintService.postAcceptReplay(this.mangmentComplaint) ;

  }
  rejected(){
    const currentReplay : number = this.mangmentComplaint.flow.currentstep;
    this.mangmentComplaint.flow.steps[currentReplay].rejected = true ; 
    this.mangmentComplaint.flow.steps[currentReplay].note = this.noteText.toString();


    this.mangmentComplaintService.postAcceptReplay(this.mangmentComplaint)
  }


}
