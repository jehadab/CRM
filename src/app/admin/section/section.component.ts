import { Component, Injectable, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Section } from './section.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SectionService } from './section.service';



@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css'],
})
export class SectionComponent implements OnInit {

  orginalSectionArray: Section[] = [];
  sectionArray: Section[] = [];
  sectionForm: FormGroup;
  checkedArray: boolean[];
  idCounter: number = 0;
  modalRef: BsModalRef;
  isAddbuttonHidden: boolean = false;
  isDelatedSectionHasChildren: boolean = true;
  isHasChildren: boolean = false;
  // sectionParentArray: [{ id: number, parentName: string }] // delete this

  constructor(
    private modalService: BsModalService,
    private http: HttpClient,
    private sectionService: SectionService
  ) {

  }

  ngOnInit(): void {
    // this.sectionParentArray = [{ id: 0, parentName: 'root' }]

    this.sectionService.fetchSections(this.sectionArray).subscribe(res=>{
      this.isSectionArrayEmpty();

    },err=>{

    })

    this.fillParentNameSectionArray(this.sectionArray);
    this.fillCheckedArray()
    // this.fillParentArray();
    this.orginalSectionArray = this.sectionService.copyArray(this.sectionArray, this.orginalSectionArray);
    this.sectionForm = new FormGroup({
      'sectionName': new FormControl(null, Validators.required),
      'sectionParent': new FormControl(null, Validators.required)
    })
    this.sectionService.setSectionNameArray(this.orginalSectionArray)

  }

  private isSectionArrayEmpty() {
    if (this.sectionArray.length == 0) {
      this.sectionArray.push(new Section(0, "root", 0, "root"))
    }
  }

  private fillParentNameSectionArray(nativeArray: Section[]) {
    nativeArray.forEach(_section => {
      let _currentParent = nativeArray.findIndex((searchingSection, index) => {

        if (_section.getSectionId() == 0) {

          _section.setParentName('root')

          return true;
        }
        else if (searchingSection.getSectionId() == _section.getparent()) {

          _section.setParentName(searchingSection.getSectionName())

          return true;
        }
      });
    });
  }
  
  onSectionparentChange(event: HTMLInputElement) {

    let rowID: number = +(event.closest('tr').firstChild.textContent)
    this.sectionArray.find((_section, index) => {
      if (_section.getSectionId() == rowID) {
        _section.setparent(+event.value)
        _section.setParentName(this.getParentName(_section.getparent(), this.sectionArray))

        // console.log(_section);

        return true;
      }

    })

  }

  onSeactionNameChange(event: any) {

    // console.log('fire');

    let span = event.span
    let rowID: number = +(span.closest('tr').firstChild.textContent)
    this.sectionArray.find((_section, index) => {
      if (_section.getSectionId() == rowID) {

        _section.setSectionName(this.changeNameValue(event.value));
        //  console.log(this.sectionArray);


        return true;
      }

    })


  }

  private fillCheckedArray() {
    this.checkedArray = []
    this.sectionArray.forEach(
      () => {
        this.checkedArray.push(false);
      })
  }
  
  onCheckSection(checkbox: HTMLInputElement) {
    this.sectionService.sectionChecked(this.checkedArray, checkbox);
    if (this.isHasChildren) {
      this.isHasChildren = false;
    }
    // console.log(this.checkedArray);


  }
  checkAll(checkbox: HTMLInputElement) {

    this.sectionService.checkAll(this.checkedArray);
  }
  refrechChackedArray() {
    this.checkedArray = []
    this.sectionArray.forEach(
      () => {
        this.checkedArray.push(false);
      })
  }
  getSectionCheckedNumber() {
    return this.sectionService.getSectionCheckedNumber(this.checkedArray)
  }
  deleteSelectedSection() {
    if (
      (!this.sectionArray.find((_section, _idx) => {
        if (this.sectionService.isSectionGotChilds(_section.getSectionName(), this.sectionArray) && this.checkedArray[_idx]) {
          this.isHasChildren = true;
          return true
        }
      }))
    ) {
      this.sectionArray = this.sectionArray.filter(
        (_section, _idx) => {

          if (!this.checkedArray[_idx]) {
            return true;
          }
        })
    }
    
    this.refrechChackedArray();
    this.sectionService.refreshCheckBox(this.checkedArray)
  }

 

  private getParentName(id: number, _sectionArray: Section[]): string {
    let parentName: string
    parentName = _sectionArray.find((_section, index) => {
      if (id == _section.getSectionId()) {
        return true;
      }
    }).getSectionName()
    return parentName;
  }
  changeNameValue(name: string): string {
    return name;
  }

  createSection() {
    this.idCounter = this.sectionArray.length + 1;
    const sendSection = {name :       this.sectionForm.controls['sectionName'].value,
     parent : this.sectionForm.controls['sectionParent'].value}
     console.log(sendSection);
     
    let _section: Section = new Section(this.idCounter,
      this.sectionForm.controls['sectionName'].value,
      this.sectionForm.controls['sectionParent'].value);

    if (!this.sectionForm.invalid) {

      this.sectionService.postSection(sendSection).subscribe(res=>{

      }, err=>{

      })
      this.sectionArray.push(_section);
      this.sectionForm.reset() ;
      this.isAddbuttonHidden = !this.isAddbuttonHidden ;
    }
    else{
    }
    

  }


  resetChanges() {
    this.sectionArray = this.sectionService.copyArray(this.orginalSectionArray, this.sectionArray)
    this.isSectionArrayEmpty();
    this.refrechChackedArray();

  }
  saveChanges(template: TemplateRef<any>) {

    this.openModal(template)

  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  confirm() {
    this.orginalSectionArray = this.sectionService.copyArray(this.sectionArray, this.orginalSectionArray)
    this.sectionService.setSectionNameArray(this.orginalSectionArray)

    // this.sendData()
    this.modalRef.hide();
  }
  decline() {
    this.modalRef.hide();

  }
  onload(event) {
    console.log("gi" + event);

  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }
  ss(ss: any) {
    console.log(ss);

  }
  sendData() {
  //   this.http.post(
  //     'https://crmproject-558a8-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
  //     this.sectionArray
  //   ).subscribe((soso => {
  //     console.log(soso);

  //   }))
   }



}

