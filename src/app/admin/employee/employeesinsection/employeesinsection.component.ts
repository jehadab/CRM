import { HttpClient } from '@angular/common/http';
import { TemplateRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { __assign } from 'tslib';
import { Employee } from "../employee.model";
import { EmployeesInSectionService } from './employeesinsection.service';

@Component({
  selector: 'app-employeesinsection',
  templateUrl: './employeesinsection.component.html',
  styleUrls: ['./employeesinsection.component.css']
})
export class EmployeesinsectionComponent implements OnInit {

  selectedSection: { id: number, name: string };

  sectionNameArray: { id: number, name: string }[] = [];
  rolesArray: { id: string, name: string }[] = [];
  employeeArray: Employee[] = [];
  isaddEmployeeHidden: boolean = false;
  orginalEmployeeArray: Employee[] = [];
  employeesForm: FormGroup = new FormGroup({});
  checkedArray: boolean[];
  employee: Employee;
  employeeId: number = 0;
  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private employeeService: EmployeesInSectionService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.employeesForm = new FormGroup({
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.required),
      'employeeSection': new FormControl(null, Validators.required),
      'employeRole': new FormControl(null, Validators.required) , 
      'phoneNumber' : new FormControl(null , Validators.required),
      'password' : new FormControl ( null , Validators.required)

    })


    //   this.employee = new Employee(this.employeeId++, 'abo somr'
    //     , 'al derane', "fofo@test.com", this.sectionNameArray[0])
    //   this.employeeArray.push(this.employee)
    //   this.employee = new Employee(this.employeeId++, 'abo fofo'
    //     , 'al derane', "fofo@test.com", this.sectionNameArray[0])
    //   this.employeeArray.push(this.employee)
    //   this.employee = new Employee(this.employeeId++, 'abo gogo'
    //     , 'al derane', "fofo@test.com", this.sectionNameArray[0])
    //   this.employeeArray.push(this.employee)

    //   this.employee = new Employee(this.employeeId++, 'abo zozo'
    //     , 'al derane', "zozo@test.com", this.sectionNameArray[1])
    //   this.employeeArray.push(this.employee)
    //   this.employee = new Employee(this.employeeId++, 'abo ss'
    //     , 'al derane', "zozo@test.com", this.sectionNameArray[1])
    //   this.employeeArray.push(this.employee)

    //   this.employee = new Employee(this.employeeId++, 'abo bb'
    //     , 'al derane', "zozo@test.com", this.sectionNameArray[2])
    //   this.employeeArray.push(this.employee)
    //   this.employee = new Employee(this.employeeId++, 'abo nn'
    //     , 'al derane', "zozo@test.com", this.sectionNameArray[2])
    //   this.employeeArray.push(this.employee)
    this.isaddEmployeeHidden = !this.isThereEmplyees()
    // console.log(this.sectionNameArray);

  }

  ngOnInit(): void {
    // console.log(this.router.getCurrentNavigation().extras.state);

    this.route.data.subscribe((data: Data) => {

      //     // console.log(_data['sectionNameArray']);

      this.selectedSection = data['selectedSection'];
      this.employeeService.selectedSection = data['selectedSection']

    })

    this.employeeService.fetchAllSectionsName(this.sectionNameArray).subscribe(res => {

    }, err => {

    });
    this.employeeService.fetchEmployees(this.employeeArray).subscribe(res => {

    }, err => {

    });
    this.employeeService.fetchAllRoles(this.rolesArray).subscribe(res => {

    }, err => {

    });


    // this.employeeService.fetchEmployees(this.employeeArray);
    // this.employee = new Employee(this.employeeId++, 'abo somr'
    //   , 'al derane', "fofo@test.com", this.sectionNameArray[0])
    // this.employeeArray.push(this.employee)
    // this.employee = new Employee(this.employeeId++, 'abo fofo'
    //   , 'al derane', "fofo@test.com", this.sectionNameArray[0])
    // this.employeeArray.push(this.employee)
    // this.employee = new Employee(this.employeeId++, 'abo gogo'
    //   , 'al derane', "fofo@test.com", this.sectionNameArray[0])
    // this.employeeArray.push(this.employee)

    // this.employee = new Employee(this.employeeId++, 'abo zozo'
    //   , 'al derane', "zozo@test.com", this.sectionNameArray[1])
    // this.employeeArray.push(this.employee)
    // this.employee = new Employee(this.employeeId++, 'abo ss'
    //   , 'al derane', "zozo@test.com", this.sectionNameArray[1])
    // this.employeeArray.push(this.employee)

    // this.employee = new Employee(this.employeeId++, 'abo bb'
    //   , 'al derane', "zozo@test.com", this.sectionNameArray[2])
    // this.employeeArray.push(this.employee)
    // this.employee = new Employee(this.employeeId++, 'abo nn'
    //   , 'al derane', "zozo@test.com", this.sectionNameArray[2])
    // this.employeeArray.push(this.employee)
    // this.isaddEmployeeHidden = !this.isThereEmplyees()
    // // console.log(this.sectionNameArray);

    this.copyOrginalArray();
    // this.sortEmployeesBySection()

    // this.filteredSectionsName =  this.sectionNameArray ;
    // this.searchFilterSubscription = this.searchFilterForm.valueChanges
    // .pipe(

    //   map(value => this._filter(value))

    // );
    // .subscribe(value => this._filter(value))

  }

  private copyOrginalArray() {
    this.fillCheckedArray()
    this.employeeArray.forEach((_emp) => {
      this.orginalEmployeeArray.push(
        new Employee(_emp.getId(), _emp.getFirstname(), _emp.getLastname(),
          _emp.getEmail(), _emp.getSectionName(), _emp.role)
      )
    })
  }
  closeForm() {
    this.isaddEmployeeHidden = !this.isaddEmployeeHidden;
    this.employeesForm.reset();
  }
  saveForm() {
    let emp : Employee
    if (this.employeesForm.valid) {
      emp = new Employee(this.employeeId++,
        this.employeesForm.controls['firstName'].value,
        this.employeesForm.controls['lastName'].value,
        this.employeesForm.controls['email'].value,
        this.employeesForm.controls['employeeSection'].value,
        this.employeesForm.controls['password'].value ,
        this.employeesForm.controls['employeRole'].value ,
        this.employeesForm.controls['phoneNumber'].value ,
        )
        // console.log(emp);
        
        // console.log('password',this.employeesForm.controls['password'].value);
        // console.log(emp);
        
        this.employeeService.sendEmployee(emp).subscribe(res=>{
        this.employeeArray.push(emp)

      },err=>{
        

      })
      this.employeesForm.reset()
      // this.sortEmployeesBySection()
      this.isaddEmployeeHidden = !this.isaddEmployeeHidden;
    }
  }
  isThereEmplyees(): boolean {
    if (this.employeeArray.length == 0) {
      return false;
    }
    else {
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
  // sortEmployeesBySection() {
  //   this.employeeArray.sort((_a, _b) =>
  //     _a.getSectionName().toLocaleLowerCase()
  //       .localeCompare(_b.getSectionName().toLocaleLowerCase())
  //   )
  // }

  onSectionNameChange(event: HTMLInputElement) {
    let _empId = +(event.closest('tr').querySelector('td').textContent)
    //  console.log(_empId);

    this.employeeArray.find((_emp, index) => {
      if (_emp.getId() == _empId) {

        _emp.setSectionName(event.value)
        // this.sortEmployeesBySection();
        return true
      }
    })

  }
  onRoleChange(event: HTMLInputElement) {
    let _empId = +(event.closest('tr').querySelector('td').textContent)
    //  console.log(_empId);

    this.employeeArray.find((_emp, index) => {
      if (_emp.getId() == _empId) {

        _emp.role = event.value
        // this.sortEmployeesBySection();
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

  onEmployeeChecked(checkbox: HTMLInputElement) {
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


  resetChanges() {


    this.employeeArray = []
    this.orginalEmployeeArray.forEach((_emp) => {
      this.employeeArray.push(new Employee(
        _emp.getId(), _emp.getFirstname()
        , _emp.getLastname(), _emp.getEmail(), _emp.getSectionName()));
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
