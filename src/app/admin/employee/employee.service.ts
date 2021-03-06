import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Statics } from 'src/app/shered/statics.component';
import { Employee } from './employee.model';
 import { users } from './example.json'



@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    constructor(private http : HttpClient){

    }
    public selectedSection :{id : number , name :  string};

    getSectionName() : {id : number , name :  string}{
        return this.selectedSection;
        
    }

    fetchAllSectionsName(sectionName ){
        return this.http.get(Statics.API_HOST + 'department/all' ).pipe(tap((resault : any) => {
            resault.forEach((element : any) => {
                
                sectionName.push({id : element.id , name : element.name });
                
            });
        }))

    }
    
    // fetchEmployees(empArray : Employee[]){
    //     users.forEach(
    //         (user)=>{
    //             empArray.push(new Employee (
    //                 user.id ,
    //                 user.firstName,
    //                 user.lastName,
    //                 user.email,
    //                 user.sectionName))
    //     })

    // }

    sectionChecked(checkarray: boolean[], checkbox: HTMLInputElement) {
        const allCheckBox = (document.querySelectorAll('[aria-label^="checkbox"]'));
        allCheckBox.forEach((_element: HTMLInputElement, _index) => {
            checkarray[_index] = _element.checked;

        })


    }
    // checkAll(checkarray: boolean[]) {
    //     let isAllChecked = true;

    //     checkarray.forEach(
    //         (element, index) => {
    //             if (element == false) {
    //                 isAllChecked = element && false
    //             }
    //             else {
    //                 isAllChecked = element && true
    //             }
    //         }
    //     )
    //     const allCheckBox = (document.querySelectorAll('[aria-label^="checkbox"]'));
    //     if (isAllChecked) {

    //         allCheckBox.forEach(
    //             (element: HTMLInputElement, index) => {
    //                 element.checked = false;
    //                 checkarray[index] = false;



    //             });
    //     }
    //     else {
    //         allCheckBox.forEach(
    //             (element: HTMLInputElement, index) => {
    //                 element.checked = true;
    //                 checkarray[index] = true;

    //             });

    //     }
    // }
    // getEmployeeCheckedNumber(checkarray: boolean[]): number {
    //     let checkedCount = 0;
    //     checkarray.forEach((element, index) => {
    //         if (element) {
    //             checkedCount++;
    //         }
    //     })
    //     return checkedCount;
    // }
    // refreshCheckBox(checkarray: boolean[]) {

    //     const allCheckBox = (document.querySelectorAll('[aria-label^="checkbox"]'));
    //     const checkAll = (document.querySelector("[id^='checkAll']") as HTMLInputElement);


    //     checkarray = []
    //     allCheckBox.forEach(
    //         (element: HTMLInputElement, index) => {
    //             element.checked = false

    //         }
    //     )
    //     checkAll.checked = false

    // }

    
    
    // deleteSelectedSections(e, ployee: Employee[], checkedArray: boolean[], isHasChildren: boolean) {

    // }
    // isSectionGotChilds(section: string, empArray: Employee[]): boolean {

    //     //     if (
    //     //         empArray.filter((element, index) => {

    //     //         if (element.getParentName() == section) {

    //     //           return true;

    //     //         }

    //     //       }).length > 0
    //     //     ) {

    //     //       return true;
    //     //     }
    //     //     else false

    //     //   }
    //     return


    // }

    
}

