import { Component, ElementRef, Input, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { Event } from '@angular/router';
import { Section } from './section.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ReplaceDataSection } from "./section.directive";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  section: Section;
  orginalSectionArray : Section[] = [];
  sectionArray: Section[] = [];
  sectionParentArray: [{ id: number, parentName: string }] // delete this
  sectionForm : FormGroup;
  idCounter: number = 0;
  ishidden : boolean = false ;
  modalRef: BsModalRef ;
  

  

  constructor(
      private render: Renderer2,
      private modalService: BsModalService,
      private http : HttpClient
    ) {

  }

  ngOnInit(): void {
    this.sectionParentArray = [{ id: 0, parentName: 'root' }]
    this.section = new Section(1, 'headQuarter', 0);
    this.sectionArray.push(this.section);
    this.section = new Section(2, '1edSection', 1);
    this.sectionArray.push(this.section);
    this.section = new Section(3, '2edSection2', 2);
    this.sectionArray.push(this.section);
    this.section = new Section(4, '3edSection3', 3);
    this.sectionArray.push(this.section);
    this.fillParentNameSectionArray(this.sectionArray);
    this.fillParentArray();
    this.sectionArray.forEach((_section)=>{
      this.orginalSectionArray.push((
        new Section(_section.getSectionId(),_section.getSectionName(),
        _section.getparent(),_section.getParentName())));
    })
    this.sectionForm = new FormGroup({
      'sectionName': new FormControl (null, Validators.required),
      'sectionParent': new FormControl (null , Validators.required)
    })
    // console.log(this.sectionParentArray);
    // console.log(this.sectionParentArray);
    
    
  }

  fillParentNameSectionArray(nativeArray: Section[]) {
    nativeArray.forEach(_section => {
      let _currentParent = nativeArray.findIndex((searchingSection, index) => {

        if (searchingSection.getSectionId() == _section.getparent()) {

          _section.setParentName(searchingSection.getSectionName())

          return true;
        }
        if (_section.getparent() == 0) {

          _section.setParentName('root')

          return true;
        }
      });
    });
  }
  fillParentArray() {
    this.sectionArray.forEach((_section, index) => {
      let bol = this.sectionParentArray.some((_currentParent, index) => {
        return _currentParent.id == _section.getparent();

      })

      if (!bol)
        this.sectionParentArray.push(
          { id: _section.getparent(), parentName: _section.getParentName() })
    })
  }
  onSectionparentChange(event: HTMLInputElement) {

    let rowID: number = +(event.closest('tr').firstChild.textContent)
    this.sectionArray.find((_section, index) => {
      if (_section.getSectionId() == rowID) {
        _section.setparent(+event.value)
        _section.setParentName(this.getParentName(_section.getparent(), this.sectionArray))
        
        console.log(_section);

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
  private getParentName(id: number, _sectionArray: Section[]): string {
    let parentName: string
    parentName = _sectionArray.find((_section, index) => {
      if (id == _section.getSectionId()) {
        return true;
      }
    }).getSectionName()
    return parentName;
  }
  changeNameValue(name : string): string{
    return name;
  }

  createSection() {
    this.idCounter = this.sectionArray.length+1;
    let _section : Section = new Section(this.idCounter,
      this.sectionForm.controls['sectionName'].value,
      this.sectionForm.controls['sectionParent'].value);
      if(!this.sectionForm.invalid){

        this.sectionArray.push(_section);
        this.sectionForm.reset()
        this.ishidden = !this.ishidden 
      }

  }

  resetChanges(){

    
    this.sectionArray = []
    this.orginalSectionArray.forEach((_section)=>{
      this.sectionArray.push(new Section(_section.getSectionId(),_section.getSectionName()
      , _section.getparent(),_section.getParentName()));
    })
    
    console.log(this.sectionArray  );
    console.log(this.orginalSectionArray  );
  }
  saveChanges(template: TemplateRef<any>) {

    this.openModal(template)

  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  confirm() {
    this.sendData()
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
  ss(ss:any){
    console.log(ss);
    
  }
  sendData(){
      this.http.post(
        'https://crmproject-558a8-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
        this.sectionArray
      ).subscribe((soso=>{
        console.log(soso);
        
      }))
  }


}

