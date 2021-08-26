import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs/operators";
import { EmpUserModel } from '../employeeuser.model';
import { Complaint } from '../../shered/models/Complaint.model';
import { MangmentComplaint, Steps  , FlowSteps} from '../../shered/models/complaints/mangmentcomplaint.model';
import { Statics } from 'src/app/shered/statics.component';
import { ServiceComplaint  } from "../../shered/models/complaints/servicecomplaint.model";

@Injectable()
export class ComplaintsListService {
    constructor(private http: HttpClient) {

    }
    private selectedComplaint: MangmentComplaint;

    ServiceComplaint: ServiceComplaint = {
        id: 1,
        content: "",
        applyDate: new Date()
    }

    fetchComplaints(serviceComplements: Complaint[]) {

        return this.http.get(
            Statics.API_HOST + "complaint/services/get").pipe(tap(resault => {

                for (let complaint in resault) {
                    const complaintData = resault[parseInt(complaint)];
                    console.log(complaintData);


                    const serviceComplaintObject: MangmentComplaint = {
                        id: complaintData.id,
                        name: complaintData.data.title,
                        content: complaintData.data.description,
                        applyDate: complaintData.createdAt,
                        updateDate: complaintData.updateDate
                        // flow:{
                        //     stepscount : complaintData.flow.step,
                        //     currentstep : complaintData.currentstep,

                        // // }
                    }
                    let flow: FlowSteps = {
                        stepscount: complaintData.flow.step,
                        currentstep: complaintData.currentstep,

                    }

                    for (let index = 0; index < complaintData.flow.steps.length; index++) {
                        const flowData  = complaintData.flow.steps[index];
                        // console.log(flowData);
                        if (!flow.steps) {
                            flow.steps = [{
                                id: flowData.id,
                                employeeinfo: flowData.employee,
                                date: flowData.date,
                                status: flowData.status,
                                note: flowData.note ,
                                valid : flowData.valid = "true"  ? true : false 
                                
                                
                                

                            }]
                        }

                        else {
                            flow.steps.push(
                                {
                                    id: flowData.id,
                                    employeeinfo: flowData.employee,
                                    date: flowData.date,
                                    status: flowData.status,
                                    note: flowData.note


                                })

                        }

                    }
                    serviceComplaintObject.flow = flow;

                    serviceComplements.push(serviceComplaintObject);
                }
            }))



    }
    setSelectedComplaint(complaitn: MangmentComplaint) {

        this.selectedComplaint = complaitn;
    }
    getSelectedComplaint(): MangmentComplaint {

        return this.selectedComplaint

    }


}