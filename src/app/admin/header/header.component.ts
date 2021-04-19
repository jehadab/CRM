
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  
})
export class HeaderComponent implements OnInit {

  @Input() isMenuCollapsed : boolean ;
  constructor() { 

  }

  ngOnInit(): void {
  }

  toggleSideNav(){
    

    return this.isMenuCollapsed = !this.isMenuCollapsed;
  }
  

}

@Component({
  selector: 'top-header',
  templateUrl:'./topheader.component.html',
  styleUrls:['./topheader.component.css']
})
export class TopHeader implements OnInit{
  @Output('sideNavToggler') toggleer :  EventEmitter<any> = new EventEmitter();


  ngOnInit(){

  }
  isOpen :boolean = true ;
  toggleside(){

    this.isOpen = !this.isOpen;    
    this.toggleer.emit(this.isOpen);

  }
  show(ss:any){
    
  }
}
