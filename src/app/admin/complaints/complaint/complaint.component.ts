import { stringify } from '@angular/compiler/src/util';
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
  @ViewChild('comppaintprototype') complaintPrototypeContainer: ElementRef<HTMLInputElement>

  inputTypes = ['text', 'select', 'file', 'checkbox', 'radio'] 
  depList: { id: number, name: string }[] = [{ id: 0, name: "head" }, { id: 1, name: 'fss' }];
  roleList: { id: number, name: string }[] = [{ id: 0, name: "checker" }, { id: 1, name: 'zrm' }];
  displayedFlow: { dep: string, role: string }[] = [];

  complement: Complaint;
  complaintFormGroup: FormGroup;
  formControlArray: FormArray;
  parentFormGroup: FormGroup;
  parentStepsForm: FormGroup;
  stepsFormArray: FormArray;
  nameAndTypeForm : FormGroup ;
  path: { Dep: number, role: number }[] = [];
  type: number;
  department: number;
  complaintName: string;

  constructor(
    private render: Renderer2,
    private complaintService: ComplaintService
  ) { }



  ngOnInit(): void {

    //fetch depList , roleList // add text area 


    this.formControlArray = new FormArray([])
    this.parentFormGroup = new FormGroup({ FormArray: this.formControlArray })
    this.complaintFormGroup = new FormGroup(
      {
        'label': new FormControl(null, Validators.required),
        'inputName': new FormControl(null, Validators.required),
        'inputType': new FormControl(null, Validators.required)
      })
    this.formControlArray.push(this.complaintFormGroup)

    this.stepsFormArray = new FormArray([]);
    this.parentStepsForm = new FormGroup({ FormArray: this.stepsFormArray })
    this.stepsFormArray.push(new FormGroup({
      'dep': new FormControl(null, Validators.required),
      'role': new FormControl(null, Validators.required),
    }))

    this.nameAndTypeForm = new FormGroup({
        'name' : new FormControl (null),
        'type' : new FormControl (null)
     })



    this.complement = new Complaint()


  }

  addAnotherInputField() {

    this.formControlArray.push(new FormGroup(
      {
        'label': new FormControl(null, Validators.required),
        'inputName': new FormControl(null, Validators.required),
        'inputType': new FormControl(null, Validators.required)
      }))

    this.complement.complaintInterfaceObject.inputs.push();

  }

  addAnotherFlowStep() {
    this.stepsFormArray.push(new FormGroup(
      {
        'dep': new FormControl(null, Validators.required),
        'role': new FormControl(null, Validators.required),

      }
    ))


  }

  showResault() {
    this.pakageComplaintData();


    this.complaintService.showComplaintPrototypeView(this.complaintPrototypeContainer, this.complement, this.render)
    this.complement.complaintInterfaceObject = { inputs: [] }
    //  console.log(this.complaintPrototypeContainer);

  }

  pakageComplaintData() {
    for (let index = 0; index < this.formControlArray.controls.length; index++) {
      const _formgroup = this.formControlArray.controls[index] as FormGroup;

      this.complement.complaintInterfaceObject =
        this.complement.addCompalint(
          index.toString(),
          _formgroup.controls['label'].value,
          _formgroup.controls['inputName'].value,
          _formgroup.controls['inputType'].value
        );
      // console.log(this.complement);
      // console.log(this.complement.complaintInterfaceObject);

      // console.log(this.complement);
    }
    for (let index = 0; index < this.stepsFormArray.controls.length; index++) {
      const _formgroup = this.stepsFormArray.controls[index] as FormGroup;

      this.path.push({
        Dep: _formgroup.controls['dep'].value,
        role: _formgroup.controls['role'].value
      })
      const selectedDep = this.depList.find(dep => {
        if (dep.id == _formgroup.controls['dep'].value)
          return true

      })
      const selectedRole = this.roleList.find(role => {
        if (role.id == _formgroup.controls['role'].value)
          return true

      })
      this.displayedFlow.push({ dep: selectedDep.name, role: selectedRole.name })
    }
    // console.log(this.stepsFormArray);
    this.complaintName =  this.nameAndTypeForm.controls['name'].value
    this.type =  this.nameAndTypeForm.controls['type'].value
    this.department = this.nameAndTypeForm.controls['type'].value

    console.log("name : " , this.complaintName);
    console.log("type : " , this.type);
    


  }

  save() {
    this.complaintService.sendComplaint({name : this.complaintName , type : this.type , department : this.department 
      , form : this.complement.getcomplaint().inputs , path : this.path}).
      subscribe(res=>{

    },err =>{

    })

  }


}
