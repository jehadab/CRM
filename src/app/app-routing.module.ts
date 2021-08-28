import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from "./home/home.component";
import { admincomponent } from "./admin/admin.component";
import { LoginComponent } from "./admin/login/login.component";
import { AppComponent } from './app.component';
import { HeaderComponent } from "./admin/header/header.component";
import { SectionComponent } from "./admin/section/section.component";
import { EmployeeComponent } from "./admin/employee/employee.component";
import { PageErrorComponent } from './page-error/page-error.component';
import { ServiceResolver } from './admin/section/sectionNameArray.service';
import { ComplaintsComponent } from './admin/complaints/complaints.component';
import { EmployeeloginComponent } from './useremployee/employeelogin/employeelogin.component'
import { UseremployeeComponent } from './useremployee/useremployee.component';
import { MangmentcomplaintComponent } from "./useremployee/complaints/mangmentcomplaint/mangmentcomplaint.component";
import { mangmentresolver } from "./useremployee/complaints/mangmentcomplaint/mangmentresolver.service";
import { ComplaintslistComponent } from './useremployee/complaintslist/complaintslist.component';
import { NewcomplaintComponent } from './useremployee/newcomplaint/newcomplaint.component';
import { ServicecomplaintComponent } from './useremployee/complaints/servicecomplaint/servicecomplaint.component';
import { ServiceComplaintResolver } from './useremployee/complaints/servicecomplaint/serviceresolver.service';
import { EmployeesinsectionComponent } from './admin/employee/employeesinsection/employeesinsection.component';
import { EmployeeSectionResolver } from './admin/employee/employeeresolver.service';
import { Section } from './admin/section/section.model';

// import { rootCertificates } from 'node:tls';

const routes: Routes = [
    { path: '', component: HomeComponent, },
    {
        path: 'admin', component: admincomponent, children: [
            { path : 'addDepartments', component : SectionComponent },
            // { path: 'addEmployee', component : EmployeeComponent, resolve: { sectionNameArray: ServiceResolver } },
            { path : 'addEmployee', component : EmployeeComponent},
            { path : 'complaints', component : ComplaintsComponent },
            {path : 'employees' , component : EmployeesinsectionComponent , resolve : { selectedSection : EmployeeSectionResolver} },
            { path: '', redirectTo: 'admin', pathMatch: 'full' }
        ]
    },
    {
        path: 'employee', component: UseremployeeComponent, children: [
            {
                path: 'inbox', component: ComplaintslistComponent, children: [
                ]
            },
            {
                path: 'inbox/managementcomplaint/:id',
                component: MangmentcomplaintComponent, resolve: { managementComplaint: mangmentresolver }
            },
            {
                path: 'inbox/servicecomplaint/:id',
                component: ServicecomplaintComponent, resolve: { serviceComplaint: ServiceComplaintResolver }
            },
            { path: 'newcomplaint', component: NewcomplaintComponent },

            { path: '', redirectTo: 'employee', pathMatch: 'full' }
        ]

    },
    { path: 'adminlogin', component: LoginComponent },
    { path: 'employeelogin', component: EmployeeloginComponent },
    { path: '**', component: PageErrorComponent },

    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RoutingModule {

}
