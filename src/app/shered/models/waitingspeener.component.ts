import { Component, Input, Output } from "@angular/core";
@Component({
    selector :"wait-speener",
    template : '<div class="fa-3x" *ngIf="showSpeener"> <i class="fa fa-spinner fa-spin"></i></div>'+
    '',
    
})

export class WaitSpeener {
    @Input('showSpeener')  showSpeener = true ;  



}