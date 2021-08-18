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

// import { rootCertificates } from 'node:tls';

const routes: Routes = [
    { path: '', component: HomeComponent, },
    {
        path: 'admin', component: admincomponent, children: [
            { path: 'addDepartments', component: SectionComponent },
            { path: 'addEmployee', component: EmployeeComponent , resolve : {sectionNameArray : ServiceResolver}},
            { path: 'complaints', component: ComplaintsComponent },
            { path: '', redirectTo: 'admin', pathMatch: 'full' }
        ]
    },
    {
        path:'employee' , component : UseremployeeComponent , children: [
            {path : 'inbox' , component : ComplaintslistComponent , children: [
            ]},
            {path : 'inbox/complaint/:id' , component : MangmentcomplaintComponent , resolve : { serviceComplaint : mangmentresolver }},
            {path : 'newcomplaint' , component : NewcomplaintComponent },

            {path: '' , redirectTo : 'employee' , pathMatch : 'full'}
        ]

    },
    { path: 'adminlogin', component: LoginComponent },
    {path: 'employeelogin',component : EmployeeloginComponent},
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
