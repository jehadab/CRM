import { Component } from "@angular/core"

export interface ComplaintInterface {
    inputs: Input[]

}
export interface Input {
    inputName: string
    label: string
    inputType: string
    ultipleInputs?: MultipleInputs[]


}
export interface MultipleInputs {
    inputValue: string

}
 const inputTypes = ['text','select','file','checkbox','radio']

export class Complaint {
    complaint: 
    {
        inputs: [
            { inputName: string, label: string, inputType: string, 
                multipleInputs?: [{ inputValue: string }] , required?: boolean 
                , minLingth? : number}

        ]

    }
    
    complaintInterfaceObject : ComplaintInterface 
    
    constructor() { 
        
        this.complaintInterfaceObject ={inputs:[]}
        // this.complaint = {inputs:[{}]}
        // this.inter.inputs.push({inputName : 'fofo',inputType:'select',label:'headerforfofo'})
        //  console.log(this.complaintInterfaceObject.inputs);
        
    }

    public getcomplaint() {
        return this.complaintInterfaceObject
    }

    addCompalint( label: string,inputName: string, inputType: string): ComplaintInterface {
        this.complaintInterfaceObject.inputs.push(
            { label: label , inputName : inputName , inputType : inputType})
        return this.complaintInterfaceObject
    }

}