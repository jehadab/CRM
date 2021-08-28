import { Directive, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { FormControl, FormControlName, FormGroup, FormGroupName, Validators } from '@angular/forms';

@Directive({
  selector: '[replaceDataEmployees]'
})
export class EmployeesInSectionDirective {

  private isInputapper: boolean = false;
  private clickedoutHandler ;
  @Input("fofo") inputForm : FormGroup; 
  private tableCellInput : HTMLInputElement;
  private innerData;

    @Output('onEmployeeChange') employeeDataChanging :  EventEmitter<any> = new EventEmitter(); 

  constructor(private elRef : ElementRef, private render : Renderer2) { 

  }
  ngOnInit(): void {
    
    this.dataChangeListener();
  }

  dataChangeListener(){
    this.clickedoutHandler = this.render.listen('document', "click", (event) => {
            

      if (this.elRef.nativeElement.contains(event.target)) {

          if(!this.isInputapper){
            
              
              this.tableCellInput = this.render.createElement('input');
              this.render.addClass(this.tableCellInput, 'form-control');
    
              this.innerData = this.elRef.nativeElement.innerText;
              this.render.setProperty(this.tableCellInput, 'value', this.innerData)
              this.render.setValue(this.tableCellInput , this.innerData)
              
              this.tableCellInput.required = true

              // this.elRef.nativeElement.style.display = 'none';
              // this.elRef.nativeElement.innerText = null;
              
              this.render.setProperty(this.elRef.nativeElement.firstChild ,'hidden', true )
              
              this.render.appendChild(this.elRef.nativeElement, this.tableCellInput);
              this.tableCellInput.select()
              this.isInputapper = true ;
            


          
          }
      }
      else {
          if(this.isInputapper){
              if(this.tableCellInput.checkValidity())
            {

              this.innerData = this.tableCellInput.value;
              this.elRef.nativeElement.firstChild.innerText = this.innerData
              this.tableCellInput.remove();
              this.render.setProperty(this.elRef.nativeElement.firstChild ,'hidden', false )
              this.employeeDataChanging.emit({value :this.innerData , span : this.elRef.nativeElement  })
              // this.elRef.nativeElement.style.display ;
              this.isInputapper = false;

            }
            else{
              
            }

          }


      }
  })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.clickedoutHandler();
    this.render.destroy();


}

}
