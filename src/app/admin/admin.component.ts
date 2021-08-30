import { Component, Injectable, OnInit, Renderer2 } from '@angular/core';

import {
  AUTO_STYLE,
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';

const DEFAULT_DURATION = 500;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  // animations: [
  //   trigger('collapse', [
  //     state('false', style({ width  : AUTO_STYLE, visibility: AUTO_STYLE  , position : AUTO_STYLE})),
  //     state('true', style({ width: '0', visibility: 'hidden' ,position : 'absolute'})),
  //     transition('false => true', animate(DEFAULT_DURATION + 'ms ease-in')),
  //     transition('true => false', animate(DEFAULT_DURATION + 'ms ease-out'))
  //   ])
  // ]
})

export class admincomponent implements OnInit {

  isSideMenuOpen: boolean = false;
  
  private clickHandlerOutsideSideHeader;


  constructor(private router: Router,
    private route: ActivatedRoute,
    private render: Renderer2
  ) { }

  ngOnInit(): void {


     this.router.navigate(['home'],{relativeTo:this.route})
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.


  }

  toggleSideMenu(isOpen) {

    this.isSideMenuOpen = isOpen;
    // const sideNaveElement: HTMLElement = document.querySelector("#sidemenu");
    // const topHeaderElement: HTMLElement = document.querySelector("#topheader");
    //  console.log(isOpen);
    // if (sideNaveElement.classList.contains('closed')) {
    //   this.clickHandlerOutsideSideHeader = this.render.listen('document', "click", (clickEvent) => {        
    //     if (!sideNaveElement.contains(clickEvent.target) && !topHeaderElement.contains(clickEvent.target)) {
    //        this.isSideMenuOpen = false;
          
    //     }
    //   })
    // } else {
    //   console.log("destroy");
      
    //   // this.clickHandlerOutsideSideHeader();
    // }














  }
  addClosingClick(newValue: boolean) {
    console.log("addnewvalue : " + newValue);

    this.isSideMenuOpen = newValue;

  }


}

