import {FlowSteps} from './complaints/mangmentcomplaint.model';
export interface Complaint {
    id : number ;
    name? : String ;
    content : String ;
    applyDate :Date ;
    updateDate? : Date ;
    flow? : FlowSteps ;

}