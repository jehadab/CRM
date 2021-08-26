import { Complaint } from "../../models/Complaint.model";

export interface MangmentComplaint extends Complaint{

    flow? : FlowSteps ;
}
export interface FlowSteps {
    stepscount : number , 
    currentstep : number ,
    steps? : Steps []

}
export interface Steps {

        id? : number , 
        employeeinfo? : string , 
        date? : Date , 
        // rejected : boolean , 
        status? : number , //0 rejected , 1 accepted
        note? : string ,
        valid? : boolean
}

    
    