import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { Complaint, ComplaintInterface } from './complaint.model';
import { ComplaintService } from './complaint.service';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.css']
})

export class ComplaintComponent implements OnInit {
  @ViewChild('comppaintprototype') complaintPrototypeContainer : ElementRef<HTMLInputElement>

  inputTypes = ['text', 'select', 'file', 'checkbox', 'radio']


  constructor(
    private render: Renderer2,
    private complaintService: ComplaintService
  ) { }

  complement: Complaint;
  complaintFormGroup: FormGroup;
  formControlArray : FormArray ;
  parentFormGroup : FormGroup;

  ngOnInit(): void {

    this.formControlArray = new FormArray([])
    this.parentFormGroup = new FormGroup({FormArray:this.formControlArray})
    this.complaintFormGroup = new FormGroup(
      {
        'label': new FormControl(null, Validators.required),
        'inputName': new FormControl(null, Validators.required),
        'inputType': new FormControl(null, Validators.required)
      })
      this.formControlArray.push(this.complaintFormGroup)
      this.complement = new Complaint()
      

  }

  addAnotherInputField(){

     this.formControlArray.push(new FormGroup(
      {
        'label': new FormControl(null, Validators.required),
        'inputName': new FormControl(null, Validators.required),
        'inputType': new FormControl(null, Validators.required)
      }))
      this.complement.complaintInterfaceObject.inputs.push();

  }
  showResault() {
    
    for (let index = 0; index < this.formControlArray.controls.length; index++) {
      const _formgroup = this.formControlArray.controls[index] as FormGroup ;
      
      this.complement.complaintInterfaceObject =
        this.complement.addCompalint(
          _formgroup.controls['label'].value,
          _formgroup.controls['inputName'].value,
          _formgroup.controls['inputType'].value
        );
        // console.log(this.complement);
        // console.log(this.complement.complaintInterfaceObject);

        // console.log(this.complement);
      }
      this.complaintService.showComplaintPrototypeView(this.complaintPrototypeContainer, this.complement, this.render)
      //  console.log(this.complaintPrototypeContainer);

  }
  
 save(){
   
 }


}
