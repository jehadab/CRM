import { Component } from "@angular/core";
@Component({

    selector : "emp-sidenav",
    templateUrl : "./empsidenav.component.html",
    styleUrls : ["./empsidenav.component.css"]
})
export class EmployeeSideNav {
    sidenav : HTMLElement ;
    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.sidenav = document.getElementById('sidebar');
    }
    toggleSidenav(event : HTMLElement ){
        if( this.sidenav.classList.contains('active') ){
            this.sidenav.classList.remove('active');
            return;
        }
        this.sidenav.classList.add('active')


    }
    

}