import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  sidenavstatus : boolean ;
  constructor() { 

  }

  ngOnInit(): void {
    this.sidenavstatus = true;
  }

  toggleSideNav(){
    return this.sidenavstatus = !this.sidenavstatus;
  }

}
