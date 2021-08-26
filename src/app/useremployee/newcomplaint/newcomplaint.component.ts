import { TitleCasePipe } from '@angular/common';
import { HtmlAstPath, TypeofExpr } from '@angular/compiler';
import { Compiler, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgModel, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { findIndex } from 'rxjs/operators';
import { inputs } from "./example.json";
import { NewComplaintService } from './newcomplaintservice.service';




@Component({
  selector: 'app-newcomplaint',
  templateUrl: './newcomplaint.component.html',
  styleUrls: ['./newcomplaint.component.css']
})
export class NewcomplaintComponent implements OnInit {
  complaintForm: FormGroup;
  formArray :  FormArray ;
  inputsJSON = inputs;

  // @ViewChild('leftFormContainer', { static: true }) leftFormContainer: ElementRef;
  // @ViewChild('rightFormContainer', { static: true }) rightFormContainer: ElementRef;

  constructor(private render: Renderer2,
    private newComplaintService : NewComplaintService) { }

  ngOnInit(): void {    

    this.complaintForm = new FormGroup({


    })

    
    // inputs.forEach(element => {
    //   let id = "id" + inputs.indexOf(element);
    //   if ((inputs.indexOf(element) % 2) == 0) {
    //     const parentElemt: HTMLElement = this.leftFormContainer.nativeElement;


    //     // this.newComplaintService.createInput(parentElemt, this.render, element)

    //   }
    //   else {

    //     const parentElemt: HTMLElement = this.rightFormContainer.nativeElement;

    //     // this.render.setProperty(input , 'type' , element.inputType)

    //     // this.newComplaintService.createInput(parentElemt, this.render, element)


    //   }
    // });
    let id1 = 0 ;
    inputs.forEach(input => {
      
      let fromControl: FormControl = new FormControl(null)
      
      this.complaintForm.addControl(input.inputName, fromControl)
      // console.log("name ",input.inputName);
      // console.log("control ",fromControl);
      // console.log("form ",this.complaintForm);
      

    })

  }

    submitComplaint(){
      let reqbody : {name? : string ,disctiption? : string } = {};
      let dataArray : {[key : string] : string}[] = []; 
       
      inputs.forEach(element=>{
        //  this.complaintForm.controls[element.inputName].setValue('444')
        dataArray.push({[element.inputName] : this.complaintForm.controls[element.inputName].value })
         
        
      })
      
      
      this.newComplaintService.submit(dataArray).subscribe(res=>{
          console.log(res);
          
        },err=>{
          console.log(err);
          

      })
      // console.log(this.complaintForm.controls['testc'].value);
      
      
      
      
      // console.log(this.test.controls['testc'].value);
      
      // console.log("hi",this.complaintForm.controls);
      
      
    
    
  }

}
