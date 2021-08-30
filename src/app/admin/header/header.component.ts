
import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],

})
export class HeaderComponent implements OnInit {
  @Input() isMenuCollapsed: boolean = false;

  constructor(private render: Renderer2) {
    // this.clickHandlerOutsideSideHeader = this.render.listen('document', "click", (clickEvent) => {
    //   console.log("headermenustatus: "+this.isMenuCollapsed);

    //   if(!this.isMenuCollapsed){
    //     const element : HTMLElement = document.querySelector("#sidemenu");
    //     if(!element.contains(clickEvent.target) ){
    //       // this.isMenuCollapsed = !this.isMenuCollapsed
    //       this.menuValueChange.emit(this.isMenuCollapsed);
    //     }

    //   }
    // })


  }

  ngOnInit(): void {
  }

}

@Component({
  selector: 'top-header',
  templateUrl: './topheader.component.html',
  styleUrls: ['./topheader.component.css']
})
export class TopHeader implements OnInit {
  @Output('sideNavToggler') toggleer: EventEmitter<any> = new EventEmitter();
  isOpen: boolean = false;
  private clickHandlerOutsideSideHeader;


  constructor(private render: Renderer2,
    private router : Router) {

  }
  ngOnInit() {

  }
  toggleside() {

    this.isOpen = !this.isOpen;
    this.toggleer.emit(this.isOpen);

    const sideNaveElement: HTMLElement = document.querySelector("#sidemenu");
    const topHeaderElement: HTMLElement = document.querySelector("#topheader");
    if (this.isOpen) {
      // console.log(sideNaveElement.classList);
      // console.log("contain closed");

      this.clickHandlerOutsideSideHeader = this.render.listen('document', "click", (clickEvent) => {
        if (!sideNaveElement.contains(clickEvent.target) && !topHeaderElement.contains(clickEvent.target)) {
          this.isOpen = false;
          this.toggleer.emit(this.isOpen);

        }
      })
    }



  }
  logout(){
    this.router.navigate(['/'])
  }
  show(ss: any) {

  }
}
