import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { admincomponent } from './admin/admin.component'
import { LoginComponent } from './admin/login/login.component';
import { HeaderComponent , TopHeader } from './admin/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SectionComponent } from './admin/section/section.component';
import { SectionService } from './admin/section/section.service';
import { ReplaceDataSection } from './admin/section/section.directive'
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from '@angular/material/icon';
import { EmployeeComponent } from './admin/employee/employee.component';
import { EmployeeDirective } from './admin/employee/employee.directive';
import { PageErrorComponent } from './page-error/page-error.component';
import { RoutingModule } from "./app-routing.module";
import { ServiceResolver } from "./admin/section/sectionNameArray.service";
import { ComplaintComponent } from './admin/complaints/complaint/complaint.component';
import { ComplaintService } from './admin/complaints/complaint/complaint.service';
import { ComplaintsComponent } from './admin/complaints/complaints.component'

@NgModule({
  declarations: [
    AppComponent,
    admincomponent,
    LoginComponent,
    HeaderComponent,
    TopHeader,
    HomeComponent,
    SectionComponent,
    ReplaceDataSection,
    EmployeeComponent,
    EmployeeDirective,
    PageErrorComponent,
    ComplaintComponent,
    ComplaintsComponent,
    
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    RoutingModule

  ],
  providers: [ServiceResolver , SectionService ,ComplaintService],
  bootstrap: [AppComponent]
})
export class AppModule { }
