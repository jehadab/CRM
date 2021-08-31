import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge, OperatorFunction, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Complaint } from "../../shered/models/Complaint.model"
import { EmployeeAuth } from '../employeelogin/employeeauth.service';
import { ComplaintsListService } from './complaintslist.service';
import  { MangmentComplaint  } from '../../shered/models/complaints/mangmentcomplaint.model';
import  { ServiceComplaint  } from '../../shered/models/complaints/servicecomplaint.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-complaintslist',
  templateUrl: './complaintslist.component.html',
  styleUrls: ['./complaintslist.component.css']
})
export class ComplaintslistComponent implements OnInit {


  onmangmentComplaints : boolean = true ;
  mangmentComplaints: MangmentComplaint[] = [];
  serviceComplaints: ServiceComplaint[] = [];
  displayedComplaints : Complaint [] = [];
  searchedComplaints : any[]= []
  @ViewChild("mangmentComplaint") mangmentElemnt: ElementRef;
  @ViewChild("serviceComplaint") serviceElemnt: ElementRef;
  
  constructor(private complaintListService: ComplaintsListService,
              private emplyeeAuth : EmployeeAuth , 
              private router : Router ,
              private activeRoute : ActivatedRoute ) { 
      
  }

  mangmentComplaint: MangmentComplaint = {
    id: 0,
    content: "hi im fonoshi",
    applyDate: new Date()
  };
  serviceComplaint: ServiceComplaint = {
    id: 0,
    content: "hi im fonoshi",
    applyDate: new Date()
  };
  ngOnInit(): void {

    this.complaintListService.fetchComplaints( this.mangmentComplaints , "management").subscribe(resault =>{
      //  console.log('fetch res : ', resault);
      

    },errorMessage  => {
      console.log(errorMessage);
      
      
    })
   this.displayedComplaints = this.mangmentComplaints;

    
      // let possible = " ABCDEFGHIJKLMNOPQRSTUVWXYZ " ;
      // for (let i = 0; i <= 5; i++) {

      
      //   this.mangmentComplaint.id = i;
      //    this.mangmentComplaint.name = "my boss make bad decisions" 
      //   // this.mangmentComplaint.name = ''
       
      //   // for (let index = 0; index < 12; index++) {
        
      //   //   this.mangmentComplaint.name +=  possible.charAt(Math.floor(Math.random() * possible.length)); 
        
      //   // }
      //   this.mangmentComplaint.applyDate = new Date();
      //   this.mangmentComplaint.content = "there is many decision made by my boss can harm the Economie of the company. "+ i;
      //   this.mangmentComplaint.updateDate = new Date() ;
      //   this.mangmentComplaint.flow = {
      //     'stepscount' : 5 ,
      //     'currentstep': 5 ,
     
        
      //      steps :[{
      //        id : 4,
      //        employeeinfo : "management office header",
      //      date : new Date(),
      //      status : 1,
      //      note  : "we have check the Financial budget , and there is flaw on it",
      //      valid : true ,
      //      },{
        
      //        id : 3,
      //        employeeinfo : "Director",
      //      date : new Date(),
      //      status : 0,
      //      note  : "decision has been made to the Head of Department",
      //      valid : true
        
      //      }]
      //   }

      //   this.mangmentComplaints.push(Object.assign({},this.mangmentComplaint));

       
      
      // }
    //  for (let i = 0; i <= 50; i++) {
    
    //    this.serviceComplaint.id = i;
    //    this.serviceComplaint.applyDate = new Date();
    //    this.serviceComplaint.content = "zrm zrmbo zeza meko" + i ;
    //    this.serviceComplaint.updateDate = new Date() 

    //    this.serviceComplaints.push(Object.assign({},this.serviceComplaint));

    //  }

    //  this.displayedComplaints.forEach(element => {
    //    this.searchedComplaints.push(element.name);
    //  });
    

     this.searchsubscription =  this.instance.selectItem.subscribe((value )=>{
      
        // console.log('hi');
       if(value == ''  || this.model == ''){ 
         if(this.onmangmentComplaints){
          //  console.log('empty');
          
           this.displayedComplaints = this.mangmentComplaints;
           this.model = '';
          
         }
         return  ;
      }
     
        this.displayedComplaints = this.mangmentComplaints.filter(
          (_value => {
          
            //  console.log(value.item);
            //  console.log(_value.name);
             if(_value.name.toLowerCase().includes(value.item.toLowerCase()) ){
              
               return true;

            }
          })
        )
     })
    
  }


  model: any;
  searchsubscription : Subscription;

  @ViewChild('instance', { static: true }) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term =>( term == '' && term.length > 1 )? []
      : this.searchedComplaints.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  )
    
  
  
  
  showMangmentComplaint(categoryDiv: HTMLElement) {
    this.onmangmentComplaints = true;
    this.mangmentComplaints = [] ; 
    this.complaintListService.fetchComplaints( this.mangmentComplaints , "management").subscribe(resault =>{
      // console.log(resault);
      

    },errorMessage  => {
      console.log(errorMessage);
      
      
    })
  // this.displayedComplaints = this.mangmentComplaints;
    // console.log(this.serviceElemnt.nativeElement.classList);

    const classList = categoryDiv.classList;
    this.displayedComplaints = this.mangmentComplaints as Complaint[];


    classList.add("active")
     this.serviceElemnt.nativeElement.classList.remove("active")


  }
  showServiceComplaint(categoryDiv: HTMLElement) {
    this.onmangmentComplaints = false ;
    this.serviceComplaints = [] ; 

    this.complaintListService.fetchComplaints( this.serviceComplaints , "services").subscribe(resault =>{
      // console.log(resault);
      

    },errorMessage  => {
      console.log(errorMessage);
      
      
    })
  // this.displayedComplaints = this.serviceComplaints;

    const classList = categoryDiv.classList;
    this.displayedComplaints = this.serviceComplaints as Complaint[];


    classList.add('active')
    this.mangmentElemnt.nativeElement.classList.remove("active")

  }

  getSelectedComplaint(complaint : HTMLElement){
    const parentNode : HTMLElement =complaint.parentElement ;
    if(this.onmangmentComplaints){

    const selectedCompiant =  this.mangmentComplaints.find(_complaint => {
      
      if(_complaint.id == Number(parentNode.children[0].innerHTML))
      return true ;
        
    } )     
    
      this.complaintListService.setSelectedManagmentComplaint(selectedCompiant);
      this.router.navigate(['managementcomplaint/'+selectedCompiant.id],{ relativeTo :  this.activeRoute })
    }
    else {
      
    const selectedCompiant =  this.serviceComplaints.find(_complaint => {
      if(_complaint.id == Number(parentNode.children[0].innerHTML))
      return true ;
        
    } )
    // console.log("selected ",selectedCompiant);
    
          
      this.complaintListService.setSelectedServiceComplaint(selectedCompiant);
      this.router.navigate(['servicecomplaint/'+selectedCompiant.id],{ relativeTo :  this.activeRoute })
    }
    

  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.searchsubscription.unsubscribe();
  }

}
