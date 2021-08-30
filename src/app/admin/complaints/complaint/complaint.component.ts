import { FocusTrap } from '@angular/cdk/a11y';
import { stringify } from '@angular/compiler/src/util';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  depList: { id: number, name: string }[] =[];
  roleList: { id: number, name: string }[] = [];
  displayedFlow: { dep: string, role: string }[] = [];

  complement: Complaint;
  complaintFormGroup: FormGroup;
  formControlArray: FormArray;
  parentFormGroup: FormGroup;
  parentStepsForm: FormGroup;
  stepsFormArray: FormArray;
  nameAndTypeForm: FormGroup;
  path: { Dep: number, role: number }[] = [];
  sendPath = ''; 
  type: number;
  department: number;
  complaintName: string;

  constructor(
    private render: Renderer2,
    private complaintService: ComplaintService ,
    private router : Router ,
    private route : ActivatedRoute ){
      
    }
  



  ngOnInit(): void {

    //fetch depList , roleList // add text area 


    this.complaintService.fetchAllSectionsName(this.depList).subscribe(res=>{

    },err=>{

    });
    this.complaintService.fetchAllRoles(this.roleList).subscribe(res=>{

    },err=>{

    });


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
      'name': new FormControl(null),
      'type': new FormControl(null),
      'dep' : new FormControl(null)
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
    this.displayedFlow = this.displayedFlow.splice(0,this.displayedFlow.length)
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
    this.complaintName = this.nameAndTypeForm.controls['name'].value
    this.type = this.nameAndTypeForm.controls['type'].value
    this.department = this.nameAndTypeForm.controls['dep'].value

    this.sendPath 
    this.path.forEach(p=>{
      this.sendPath += p.Dep + ',' + p.role + ':'
    })
    this.sendPath =  this.sendPath.slice(0 , this.sendPath.length - 1 );

    console.log('path '+this.sendPath);
    console.log("name : ", this.complaintName);
    console.log("dep : ", this.department);
    console.log("type : ", this.type);


    



  }
  removeRow(row: HTMLElement) {
    let _empId = +(row.closest('tr').querySelector('td').textContent)

    let slectedControl =
      this.formControlArray.value.find((control, index) => {
        if (index == _empId) {

          return true;
        }
      })

    this.formControlArray.controls.splice(this.formControlArray.controls.indexOf(slectedControl));

  }
  removePathRow(row : HTMLElement){

    let _empId = +(row.closest('tr').querySelector('td').textContent)

    let slectedControl =
      this.stepsFormArray.value.find((control, index) => {
        if (index == _empId) {

          return true;
        }
      })

    this.stepsFormArray.controls.splice(this.stepsFormArray.controls.indexOf(slectedControl));


  }

  save() {
    this.pakageComplaintData()
    this.complaintService.sendComplaint({
      name: this.complaintName, type: this.type, department: this.department
      , cmpform : this.complement.getcomplaint().inputs , path: this.sendPath
    }).
      subscribe(res => {

        // this.router.navigate(['admin/complaints'])
        this.parentFormGroup.reset()
        this.formControlArray.clear();
        this.stepsFormArray.clear()
        this.nameAndTypeForm.reset();
        this.addAnotherInputField();
        this.addAnotherFlowStep();
        this.displayedFlow = this.displayedFlow.splice(0,this.displayedFlow.length)
        }, err => {

      })
      

  }


}
