import { Component, OnInit } from '@angular/core';
import { Complaint } from "./complaint/complaint.model";

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {

  complaint : Complaint
  constructor() { }

  ngOnInit(): void {
    this.complaint = new Complaint();
    // console.log(this.complaint.getcomplaint());

    
  }

}
