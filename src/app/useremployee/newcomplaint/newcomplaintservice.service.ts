import { HttpClient } from "@angular/common/http";
import { Injectable, Renderer2  } from "@angular/core";
import { Statics } from "src/app/shered/statics.component";


@Injectable()
export class NewComplaintService {
    constructor(private http : HttpClient){}

    private addInput(input: HTMLElement, parenteElement: HTMLElement, render: Renderer2, element) {        
    
        render.setProperty(input, "name", element.inputName)
        render.addClass(input, "form-control")
        render.addClass(input, "complaintInput")
    
    
    
      }
      public createInput(parenteElement: HTMLElement, render: Renderer2, element) {
        let input : HTMLElement;
        switch (element.inputType) {
    
          case ("textarea"):
            input = render.createElement('textarea');
            input.setAttribute( 'ngDefaultControl' , '' );
    
            this.addInput(input, parenteElement, render, element);

            break;
          case ("text"):
            input = render.createElement('input');
            input.setAttributeNS(null,'type', element.inputType)   
            // render.setProperty(input,"[formControlName]", element.inputName)         
             input.setAttribute('formControlName', element.inputName)
            // render.setProperty(input, )
            // render.setProperty(input, 'formControlName', element.inputName)

            this.addInput(input, parenteElement, render, element);
    
        }
    
        render.appendChild(parenteElement, input)
    
    
    
      }
    
      submit(data ){

        // console.log(data);
        return this.http.post(Statics.API_HOST + "complaint/management/add" , data )
        
      }

    
}