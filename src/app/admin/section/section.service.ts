import { Injectable } from '@angular/core';
import { Section } from './section.model';
import { dep } from './example.json'

@Injectable({
    providedIn: 'root'
})
export class SectionService {

    private sectionNameArray: string[] = [];
    fetchSections(secArray: Section[]): Section[] {
        dep.forEach(
            (_section, index) => {

                secArray.push(new Section(_section.id, _section.name, _section.parent));

            })
        return secArray;
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
    refreshCheckedSection(checkarray: boolean[]) {

        const allCheckBox = (document.querySelectorAll('[aria-label^="checkbox"]'));
        checkarray = []
        allCheckBox.forEach(
            (element: HTMLInputElement, index) => {
                checkarray.push(element.checked) ;

            }
        )
    }

}