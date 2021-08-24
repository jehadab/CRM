import { HttpClient } from '@angular/common/http';
import { TemplateRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import {map, startWith, takeUntil} from 'rxjs/operators';
import { __assign } from 'tslib';
import { Employee } from "./employee.model";
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  sectionNameArray: string[] = [];
  employeeArray: Employee[] = [];
  isaddEmployeeHidden: boolean = false;
  orginalEmployeeArray : Employee[]=[];
  addEmployeeForm: FormGroup;
  checkedArray: boolean[];
  employee: Employee;
  employeeId: number = 0;
  modalRef: BsModalRef ;

  searchFilterForm : FormControl = new FormControl() ;
  filteredSectionsName: string[] = ['One', 'Two', 'Three'];
  searchFilterSubscription: Observable<string[]>;


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    console.log("ana w habibi fejneneh");
    

    return this.filteredSectionsName.filter(option => option.toLowerCase().includes(filterValue));
  }



  constructor(     
     private modalService: BsModalService,
     private employeeService : EmployeeService , 
     private http : HttpClient,
     private route : ActivatedRoute,
    ) {


    this.route.data.subscribe(
      (_data:Data)=>{
        // console.log(_data['sectionNameArray']);
        
        this.sectionNameArray = _data['sectionNameArray']
        
        
      }
    )

    this.employeeService.fetchAllSectionsName().subscribe(sectionName=>{ sectionName =  this.sectionNameArray});

    this.employeeService.fetchEmployees(this.employeeArray);
    //  this.employee = new Employee(this.employeeId++, 'abo somr'
    //    , 'al derane', "fofo@test.com", this.sectionNameArray[0])
    //  this.employeeArray.push(this.employee)
    //  this.employee = new Employee(this.employeeId++, 'abo fofo'
    //    , 'al derane', "fofo@test.com", this.sectionNameArray[0])
    //  this.employeeArray.push(this.employee)
    //  this.employee = new Employee(this.employeeId++, 'abo gogo'
    //    , 'al derane', "fofo@test.com", this.sectionNameArray[0])
    //  this.employeeArray.push(this.employee)

    //  this.employee = new Employee(this.employeeId++, 'abo zozo'
    //    , 'al derane', "zozo@test.com", this.sectionNameArray[1])
    //  this.employeeArray.push(this.employee)
    //  this.employee = new Employee(this.employeeId++, 'abo ss'
    //    , 'al derane', "zozo@test.com", this.sectionNameArray[1])
    //  this.employeeArray.push(this.employee)

    //  this.employee = new Employee(this.employeeId++, 'abo bb'
    //    , 'al derane', "zozo@test.com", this.sectionNameArray[2])
    //  this.employeeArray.push(this.employee)
    //  this.employee = new Employee(this.employeeId++, 'abo nn'
    //    , 'al derane', "zozo@test.com", this.sectionNameArray[2])
    //  this.employeeArray.push(this.employee)
    this.isaddEmployeeHidden = ! this.isThereEmplyees()
    // console.log(this.sectionNameArray);
    




  }

  ngOnInit(): void {

    this.copyOrginalArray();
    this.sortEmployeesBySection()
    this.addEmployeeForm = new FormGroup({
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.required),
      'employeeSection': new FormControl(null, Validators.required)
    })
    this.filteredSectionsName =  this.sectionNameArray ;
    this.searchFilterSubscription = this.searchFilterForm.valueChanges
      // .pipe(
        
      //   map(value => this._filter(value))
        
      // );
      // .subscribe(value => this._filter(value))

  }
  private copyOrginalArray(){
    this.fillCheckedArray()
    this.employeeArray.forEach((_emp)=>{
      this.orginalEmployeeArray.push(
        new Employee(_emp.getId(),_emp.getFirstname(),_emp.getLastname(),
        _emp.getEmail(),_emp.getSectionName())
      )
    })
  }
  closeForm() {
    this.isaddEmployeeHidden = !this.isaddEmployeeHidden;
    this.addEmployeeForm.reset();
  }
  saveForm() {
    if (this.addEmployeeForm.valid) {
      this.employeeArray.push(new Employee(this.employeeId++,
        this.addEmployeeForm.controls['firstName'].value,
        this.addEmployeeForm.controls['lastName'].value,
        this.addEmployeeForm.controls['email'].value,
        this.addEmployeeForm.controls['employeeSection'].value)
        )
        this.addEmployeeForm.reset()
        this.sortEmployeesBySection()
        this.isaddEmployeeHidden = !this.isaddEmployeeHidden;
    }
  }
  isThereEmplyees() : boolean{
    if(this.employeeArray.length==0)
    {
      return false;
    }
    else{
      return true;
    }
  }
  getSectionLength(sectionName: string): number {
    let isSectionFound = false;
    let startedIndex = 0;
    this.employeeArray.forEach((_emp, index) => {

      if (_emp.getSectionName() == sectionName) {
        startedIndex++;
      }
    })

    return startedIndex;
  }
  sortEmployeesBySection() {
    this.employeeArray.sort((_a, _b) =>
      _a.getSectionName().toLocaleLowerCase()
        .localeCompare(_b.getSectionName().toLocaleLowerCase())
    )
  }

  onSectionNameChange(event: HTMLInputElement) {
    let _empId = +(event.closest('tr').querySelector('td').textContent)
    //  console.log(_empId);

    this.employeeArray.find((_emp, index) => {
      if (_emp.getId() == _empId) {

        _emp.setSectionName(event.value)
        this.sortEmployeesBySection();
        return true
      }
    })

  }
  changeEmployeeData(emittedData: any) {
    let span: HTMLSpanElement = emittedData.span.firstChild
    let _empId = +(span.closest('tr').querySelector('td').textContent)
    let targetName: string = span.getAttribute('name');
    let modifiedEmployee: Employee =
      this.employeeArray.find((_emp, index) => {
        if (_emp.getId() == _empId) {


          return true
        }
      })
    switch (targetName) {
      case 'firstname':
        modifiedEmployee.setFirstName(emittedData.value);
        break;
      case 'lastname':
        modifiedEmployee.setLastname(emittedData.value);
        break;
      case 'email':
        modifiedEmployee.setEmail(emittedData.value);

        break;
    }

  }

  private fillCheckedArray() {
    this.checkedArray = []
    this.employeeArray.forEach(
      () => {
        this.checkedArray.push(false);
      })
  }

  onEmployeeChecked(checkbox: HTMLInputElement){
    this.employeeService.sectionChecked(this.checkedArray, checkbox);
    // if (this.isHasChildren) {
    //   this.isHasChildren = false;
    // }
  }


  checkAll(checkbox: HTMLInputElement) {

    this.employeeService.checkAll(this.checkedArray);
  }

  refrechChackedArray() {
    this.checkedArray = []
    this.employeeArray.forEach(
      () => {
        this.checkedArray.push(false);
      })
  }
  getEmployeeCheckedNumber() {
    return this.employeeService.getEmployeeCheckedNumber(this.checkedArray)
  }
  deleteSelectedEmployee() {
    {
      this.employeeArray = this.employeeArray.filter(
        (_section, _idx) => {

          if (!this.checkedArray[_idx]) {
            return true;
          }
        })
    }
    
    this.refrechChackedArray();
    this.employeeService.refreshCheckBox(this.checkedArray)
  }


  resetChanges(){

    
    this.employeeArray = []
    this.orginalEmployeeArray.forEach((_emp)=>{
      this.employeeArray.push(new Employee(
        _emp.getId(),_emp.getFirstname()
      , _emp.getLastname(),_emp.getEmail(),_emp.getSectionName()));
    })
    
  }
  saveChanges(template: TemplateRef<any>) {

    this.openModal(template)

  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  confirm() {
    // this.sendData()
    this.modalRef.hide();
  }
  decline() {
    this.modalRef.hide();

  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
  }


}
