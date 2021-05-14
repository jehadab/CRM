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
  // sectionParentArray: [{ id: number, parentName: string }] // delete this

  constructor(
    private modalService: BsModalService,
    private http: HttpClient,
    private sectionService: SectionService
  ) {

  }

  ngOnInit(): void {
    // this.sectionParentArray = [{ id: 0, parentName: 'root' }]

    this.sectionService.fetchSections(this.sectionArray)
    this.isSectionArrayEmpty()

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
  private fillCheckedArray() {
    this.checkedArray = []
    this.sectionArray.forEach(
      () => {
        this.checkedArray.push(false);
      })
  }
  // fillParentArray() {
  //   this.sectionArray.forEach((_section, index) => {
  //     let bol = this.sectionParentArray.some((_currentParent, index) => {
  //       return _currentParent.id == _section.getparent();

  //     })

  //     if (!bol)
  //       this.sectionParentArray.push(
  //         { id: _section.getparent(), parentName: _section.getParentName() })
  //   })
  // }
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
  onCheckSection(checkbox: HTMLInputElement) {
    this.sectionService.sectionChecked(this.checkedArray, checkbox)
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
  delateSelectedSection() {
    let deletedSectionCount = 0;
    for (let index = 0; index < this.checkedArray.length; index++) {
      if (this.checkedArray[index]) {
        
      // this.isSectionGotChilds(this.sectionArray[index].getSectionName());

          
        

        if (true) {
          // this.isDelatedSectionHasChildren = false;
          // console.log("index : "+index);
          
          this.checkedArray.splice(index, 1)
          this.sectionArray.splice(index, 1)

        }
      }

    }
    console.log(this.checkedArray);
    console.log(this.sectionArray);

    // this.sectionArray = this.sectionArray.filter((element, index) => {
    //   if (!this.checkedArray[index]) {
    //     this.sectionArray.forEach((_elem, _index) => {
    //       if (_elem.getParentName() == element.getSectionName()) {
    //         deletedSectionCount++;
    //         this.isDelatedSectionHasChildren = true;

    //       }
    //     })
    //     if (!this.isDelatedSectionHasChildren) {
    //       console.log(deletedSectionCount);

    //       return true
    //     }
    //   }
    // })

  }
  isSectionGotChilds(section : string) {
    this.sectionArray.forEach((element, index) => {
      
        this.sectionArray.forEach((_elem, _index) => {
          if (_elem.getParentName() == element.getSectionName()) {

           return this.isDelatedSectionHasChildren = this.isDelatedSectionHasChildren && false;

          }
        })
      
    })
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
    let _section: Section = new Section(this.idCounter,
      this.sectionForm.controls['sectionName'].value,
      this.sectionForm.controls['sectionParent'].value);
    if (!this.sectionForm.invalid) {

      this.sectionArray.push(_section);
      this.sectionForm.reset()
      this.isAddbuttonHidden = !this.isAddbuttonHidden
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
    this.http.post(
      'https://crmproject-558a8-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
      this.sectionArray
    ).subscribe((soso => {
      console.log(soso);

    }))
  }



}

