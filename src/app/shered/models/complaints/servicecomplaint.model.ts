import { Complaint } from "../../models/Complaint.model";
export interface ServiceComplaint extends Complaint{

    

}
export interface FlowSteps {
    stepscount : number , 
    currentstep : number , 
    
    steps? : [{
        id? : number , 
        employeeinfo? : string , 
        date? : Date , 
        rejected? : boolean , 
        status? : number ,
        note? : string ,
    }
    ]
}

// "step": "3",
// "currentStep": "1",
// "steps": [
//   {
//     "id": "1",
//     "dep": "4",
//     "role": "1",
//     "employee": "email",
//     "date": "date",
//     "rejected" : true ,
//     "status": "int",
//     "note": {
//       "d": "$$$$"
//     }
//   },