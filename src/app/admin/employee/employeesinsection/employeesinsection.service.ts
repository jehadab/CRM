import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Statics } from 'src/app/shered/statics.component';
import { Employee } from '../employee.model';
 import { users } from '../example.json'



@Injectable({
    providedIn: 'root'
})
export class EmployeesInSectionService {
    constructor(private http : HttpClient){

    }
    public selectedSection : {id : number , name :  string};

    getSectionName() : {id : number , name :  string}{
        return this.selectedSection;
        
    }

    fetchAllSectionsName(sectionName ){
        return this.http.get(Statics.API_HOST + 'department/all' ).pipe(tap((resault : any) => {
            resault.forEach(element => {
                
                sectionName.push({id : element.id , name : element.name}) ;
                
            });
        }))
    }
    
    fetchAllRoles (rolesArray : {id : string , name : string}[]){
        return this.http.get(Statics.API_HOST + 'role/all').pipe(tap((roles  : any)=>{
            roles.forEach(role => {
                  rolesArray.push({id : role.id , name : role.name})  
                
            });
        }))
    }
    
    fetchEmployees(empArray : Employee[]){
        return this.http.get(Statics.API_HOST + "department/employees/"+this.selectedSection.id).pipe(tap((_users : any)=>{
            _users.forEach(_user => {
                empArray.push(new Employee (
                    _user.id ,
                    _user.firstName,
                    _user.lastName,
                    _user.email,
                    this.selectedSection.name , 
                    _user.role))

                
            });

        }))
        users.forEach(
            (user)=>{
                        })

    }

    sectionChecked(checkarray: boolean[], checkbox: HTMLInputElement) {
        const allCheckBox = (document.querySelectorAll('[aria-label^="checkbox"]'));
        allCheckBox.forEach((_element: HTMLInputElement, _index) => {
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
    getEmployeeCheckedNumber(checkarray: boolean[]): number {
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
        const checkAll = (document.querySelector("[id^='checkAll']") as HTMLInputElement);


        checkarray = []
        allCheckBox.forEach(
            (element: HTMLInputElement, index) => {
                element.checked = false

            }
        )
        checkAll.checked = false

    }
    // {firstName : string , lastName : string  , email : string , role : number , dep : number}
    sendEmployee(employee : Employee){

        return this.http.post(Statics.API_HOST+ 'users/employee' , employee) ;

    }

    
    
    deleteSelectedSections(e, ployee: Employee[], checkedArray: boolean[], isHasChildren: boolean) {

    }
    isSectionGotChilds(section: string, empArray: Employee[]): boolean {

        //     if (
        //         empArray.filter((element, index) => {

        //         if (element.getParentName() == section) {

        //           return true;

        //         }

        //       }).length > 0
        //     ) {

        //       return true;
        //     }
        //     else false

        //   }
        return


    }

    
}

