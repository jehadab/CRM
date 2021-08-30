import { Injectable } from '@angular/core';
import { Section } from './section.model';
import { department } from './example.json'
import { HttpClient } from '@angular/common/http';
import { tap } from "rxjs/operators";
import { Statics } from "../../shered/statics.component";
@Injectable({
    providedIn: 'root'
})
export class SectionService {

    private sectionNameArray: string[] = [];

constructor(private http : HttpClient,
    ) {
    
        
        
    }
    
    
    fetchSections(secArray: Section[]){
        return this.http.get(Statics.API_HOST +'department/all').pipe(tap
        (((res : any) =>{
            // console.log(res.dep);
            
            res.forEach(element => {
                secArray.push(new Section(element.id, element.name, element.parent));

            });
        })))
        // department.forEach(
        //     (_section, index) => {

        //         // secArray.push(new Section(_section.id, _section.name, _section.parent));

        //     })
    }
    postSection(section ){
        return this.http.post(Statics.API_HOST + "department/addDepartment", section)

    }
    getSectionNameArray(): string[] {

        return this.sectionNameArray;
    }
    setSectionNameArray(sectionArray: Section[]) {
        this.sectionNameArray = []
        sectionArray.forEach(
            (_section) => {
                this.sectionNameArray.push(_section.getSectionName())
            }
        )
    }
    copyArray(orginalArray: Section[], secondArray: Section[]): Section[] {
        secondArray = []
        orginalArray.forEach(element => {
            secondArray.push(new Section(element.getSectionId(), element.getSectionName()
                , element.getparent(), element.getParentName()))
        });
        return secondArray;


    }

    sectionChecked(checkarray: boolean[], checkbox: HTMLInputElement) {
        const allCheckBox = (document.querySelectorAll('[aria-label^="checkbox"]'));
        allCheckBox.forEach((_element : HTMLInputElement , _index)=>{
            checkarray[_index] = _element.checked;
            
        })
        

    }
    checkAll(checkarray: boolean[]) {
        let isAllChecked = true;

        checkarray.forEach(
            (element, index) => {
                if (element == false) {
                    isAllChecked = element && false
                }
                else {
                    isAllChecked = element && true
                }
            }
        )
        const allCheckBox = (document.querySelectorAll('[aria-label^="checkbox"]'));
        if (isAllChecked) {

            allCheckBox.forEach(
                (element: HTMLInputElement, index) => {
                    element.checked = false;
                    checkarray[index] = false;



                });
        }
        else {
            allCheckBox.forEach(
                (element: HTMLInputElement, index) => {
                    element.checked = true;
                    checkarray[index] = true;

                });

        }
    }
    getSectionCheckedNumber(checkarray: boolean[]): number {
        let checkedCount = 0;
        checkarray.forEach((element, index) => {
            if (element) {
                checkedCount++;
            }
        })
        return checkedCount;
    }
    refreshCheckBox(checkarray: boolean[]) {

        const allCheckBox = (document.querySelectorAll('[aria-label^="checkbox"]'));
        const checkAll = (document.querySelector("[id^='checkAll']") as HTMLInputElement ) ; 
               
        
        checkarray = []
        allCheckBox.forEach(
            (element: HTMLInputElement, index) => {
                element.checked = false

            }
        )
        checkAll.checked = false
        
    }
    deleteSelectedSections(sectionArray : Section[], checkedArray : boolean[] , isHasChildren : boolean) {

        
        
      
    }
    isSectionGotChilds(section: string , sectionArray : Section[]): boolean {

        if (
          sectionArray.filter((element, index) => {
    
            if (element.getParentName() == section) {
    
              return true;
    
            }
    
          }).length > 0
        ) {
    
          return true;
        }
        else false
    
      }

}