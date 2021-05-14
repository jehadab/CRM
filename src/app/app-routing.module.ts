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
    { path: 'adminlogin', component: LoginComponent },
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
