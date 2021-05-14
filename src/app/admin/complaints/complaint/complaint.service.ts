import { ElementRef, Injectable, Renderer2 } from '@angular/core';
import { Complaint } from './complaint.model';

@Injectable({
    providedIn: 'root'
})
export class ComplaintService {
    constructor(){}
    generatedInputs : HTMLInputElement[]=[];

    showComplaintPrototypeView(eleRef : ElementRef , complaint:Complaint,render : Renderer2){
        // console.log(complaint.complaintInterfaceObject);
        
        let inputs = complaint.complaintInterfaceObject.inputs
        let wrapper = eleRef.nativeElement
        //   console.log(inputs);
        
        inputs.forEach((input,index)=> {
            this.generatedInputs.push(render.createElement('input'));
            // console.log(input.inputType);
            
            switch (input.inputType) {
                
                case 'text':
                    // console.log(eleRef);
                    
                    this.generatedInputs[index].setAttribute('type',input.inputType);
                    this.generatedInputs[index].setAttribute('placeholder',input.label);
                    this.generatedInputs[index].setAttribute("class","form-control")
                    
                    
                    render.appendChild(wrapper,this.generatedInputs[index])
                    break;
                    case'select':
                        // console.log(input.inputType);
                        
                    break;
                    case'checkbox':

                    break;
                    case'radio':

                    break;
                    case'button':

                    break;
            
                default:
                    // console.log();
                    
                    break;
            }
        })
    }
}