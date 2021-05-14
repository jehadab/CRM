import { Component, Injectable, OnInit } from '@angular/core';

import {  AUTO_STYLE,
  animate,
  state,
  style,
  transition,
  trigger} from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';

  const DEFAULT_DURATION = 500;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  animations: [
    trigger('collapse', [
      state('false', style({ width  : AUTO_STYLE, visibility: AUTO_STYLE  , position : AUTO_STYLE})),
      state('true', style({ width: '0', visibility: 'hidden' ,position : 'absolute'})),
      transition('false => true', animate(DEFAULT_DURATION + 'ms ease-in')),
      transition('true => false', animate(DEFAULT_DURATION + 'ms ease-out'))
    ])
  ]
})

export class admincomponent implements OnInit{

  toggleSideMenu: boolean = true;
  constructor(private router : Router,
    private route : ActivatedRoute){}
     
    ngOnInit(): void {
      
      // this.router.navigate(['addDepartments'],{relativeTo:this.route})
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      // Add 'implements OnInit' to the class.

      
    }
     
    test(tst){
      this.toggleSideMenu =tst;
      
    }
    
     
}

  