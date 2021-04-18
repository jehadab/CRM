import { Directive, ElementRef, EventEmitter, Host, Injectable, Input, Output, Renderer2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Directive({
    selector: '[replaceDataSection]',
    
})
export class ReplaceDataSection {

    constructor(private elRef: ElementRef, private render: Renderer2) {
        // elRef.nativeElement.style.backgroundColor = 'yellow';
        this.listen();
        console.log('emitted');
        // this.sectionNameFire.emit('hoho');
        this._navItemSource.next('hoho3')
        

    }
    private isInputapper: boolean = false;
    private clickedoutHandler ;
    private tableCellInput : HTMLInputElement;
    innerData;
    private _navItemSource = new BehaviorSubject<string>('hoho1');
  // Observable navItem stream
    navItem$ = this._navItemSource.asObservable();
    @Output('onSectionNameChange') sectionNameFire :  EventEmitter<any> = new EventEmitter(); 

    // @HostListener ('click', ['$event']) clickInside(targetElement){


    //     this.isInputapper = true ;
    //     console.log("in");
    //     // this.elRef.nativeElement.replaceWith('bye')

    //  console.log(targetElement);
    //  console.log(this.elRef.nativeElement.innerText);


    // }
    thatsChanging(){
        console.log('chamge');
        
    }
    listen() {
        this.clickedoutHandler = this.render.listen('document', "click", (event) => {
            

            if (this.elRef.nativeElement.contains(event.target)) {

                if(!this.isInputapper){

                this.tableCellInput = this.render.createElement('input');
                this.render.addClass(this.tableCellInput, 'form-control');
                
                this.innerData = this.elRef.nativeElement.innerText;
                this.render.setProperty(this.tableCellInput, 'value', this.innerData)
                this.render.setValue(this.tableCellInput , this.innerData)
                
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
                    
                    
                    this.innerData = this.tableCellInput.value;
                    this.elRef.nativeElement.firstChild.innerText = this.innerData
                    this.tableCellInput.remove();
                    this.render.setProperty(this.elRef.nativeElement.firstChild ,'hidden', false )
                    this.sectionNameFire.emit({value :this.innerData , span : this.elRef.nativeElement  })
                    // this.elRef.nativeElement.style.display ;

                }

                this.isInputapper = false;

            }
        })
    }
    ngOnDestroy(): void {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.clickedoutHandler();
        this.render.destroy();


    }
    // @HostListener('document:click', ['$event']) clickout(targerElement){
    //      if(this.isInputapper ){
    //          console.log('out');
    //          console.log(targerElement);
    //          console.log(this.elRef.nativeElement.innerText);
    //          this.clickedout = true ; 
    //          targerElement.target.removeEventListener("click", targerElement , true)


    //      }
    // }

}

function ngOnDestroy() {
    throw new Error('Function not implemented.');
}
