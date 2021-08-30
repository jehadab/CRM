import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser'
import { EmployeeAuth } from './useremployee/employeelogin/employeeauth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  constructor(private meta : Meta
    ,private authService : EmployeeAuth   ){

    this.meta.addTag({name:"viewport",content:"width=device-width, user-scalable=no"})
  }
  ngOnInit() {
  
    this.authService.autoLogin();
  }

  
  title = 'CRM';
}
