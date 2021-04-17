import { Component, ElementRef, Input, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { Event } from '@angular/router';
import { Section } from './section.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';



@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  section: Section
  sectionArray: Section[] = [];
  private sectionParentSet : Set<number> ;
  sectionParentArray : [{id : number , parentName : string}] 
  modalRef: BsModalRef
  @ViewChild('parent') selectParent:HTMLSelectElement

  constructor(private render: Renderer2, private modalService: BsModalService) {

  }

  ngOnInit(): void {
    this.sectionParentArray = [{id:0 ,parentName : 'root' }]
    
    this.section = new Section(1, 'headQuarter', 0);
    this.sectionArray.push(this.section);
    this.section = new Section(2, '2edSection', 1);
    this.sectionArray.push(this.section);
    this.section = new Section(3, '2edSection2', 1);
    this.sectionArray.push(this.section);    
    this.section = new Section(4, '2edSection3', 3);
    this.sectionArray.push(this.section);    
    this.fillParentNameSectionArray(this.sectionArray);
    // console.log(this.sectionParentArray);
    
    
    this.sectionArray.forEach((_section,index)=>{
       let bol = this.sectionParentArray.some((_currentParent , index)=>{
          return _currentParent.id == _section.getparent();
          
      })
      
      if(!bol)
      this.sectionParentArray.push( 
        { id :_section.getparent() , parentName : _section.getParentName()})
      })

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

  createSection(){
    
    this.sectionArray.push(this.section)
  }

  saveChanges(template: TemplateRef<any>) {

    this.openModal(template)

  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  confirm() {
    
    console.log(this.selectParent );
    this.modalRef.hide();
  }
  decline() {
    this.modalRef.hide();

  }
  onload(event){
    console.log("gi" +event);
    
  }


}

