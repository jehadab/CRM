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

const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];


@Component({
  selector: 'app-complaintslist',
  templateUrl: './complaintslist.component.html',
  styleUrls: ['./complaintslist.component.css']
})
export class ComplaintslistComponent implements OnInit {

  plzreplace : boolean = true ;

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

    this.complaintListService.fetchComplaints( this.serviceComplaints).subscribe(resault =>{
      console.log(resault);
      

    },errorMessage  => {
      console.log(errorMessage);
      
      
    })
  this.displayedComplaints = this.mangmentComplaints;

    
    // let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890" ;
    // for (let i = 0; i <= 5; i++) {

      
    //   this.mangmentComplaint.id = i;
    //   // this.mangmentComplaint.name = "zezafon al shmal "+ i
    //   this.mangmentComplaint.name = ''
       
    //   for (let index = 0; index < 6; index++) {
        
    //     this.mangmentComplaint.name +=  possible.charAt(Math.floor(Math.random() * possible.length)); 
        
    //   }
    //   this.mangmentComplaint.applyDate = new Date();
    //   this.mangmentComplaint.content = "zrm zrmbo "+ i;
    //   this.mangmentComplaint.updateDate = new Date() ;
    //   this.mangmentComplaint.flow = {
    //     'stepscount' : 5 ,
    //     'currentstep': 1 ,
     
        
    //      steps :[{
    //        id : 4,
    //        employeeinfo : "سيد جزرة",
    //      date : new Date(),
    //      status : 1,
    //      note  : "انت مو انت و انت جعان",
    //      },{
        
    //        id : 3,
    //        employeeinfo : "سيد فراس",
    //      date : new Date(),
    //      status : 0,
    //      note  : "2انت مو انت و انت جعان",
        
    //      }]
    //   }
    //   // console.log(this.mangmentmangmentComplaints);

    //   this.mangmentComplaints.push(Object.assign({},this.mangmentComplaint));

       
      
    // }
    // for (let i = 0; i <= 50; i++) {
    
    //   this.serviceComplaint.id = i;
    //   this.serviceComplaint.applyDate = new Date();
    //   this.serviceComplaint.content = "zrm zrmbo zeza meko" + i ;
    //   this.serviceComplaint.updateDate = new Date() 

    //   this.serviceComplaints.push(Object.assign({},this.serviceComplaint));

    // }

    // this.displayedComplaints.forEach(element => {
    //   this.searchedComplaints.push(element.name);
    // });
    

    // this.searchsubscription =  this.instance.selectItem.subscribe((value )=>{
      
    //   // console.log('hi');
    //   if(value == ''  || this.model == ''){ 
    //     if(this.onmangmentComplaints){
    //       console.log('empty');
          
    //       this.displayedComplaints = this.mangmentComplaints;
    //       this.model = '';
          
    //     }
    //     return  ;
    //  }
     
    //    this.displayedComplaints = this.mangmentComplaints.filter(
    //      (_value => {
          
    //         console.log(value.item);
    //       //  console.log(_value.name);
    //         if(_value.name.toLowerCase().includes(value.item.toLowerCase()) ){
              
    //           return true;

    //        }
    //      })
    //    )
    // })
    
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
    // console.log(this.serviceElemnt.nativeElement.classList);
    this.onmangmentComplaints = true;

    const classList = categoryDiv.classList;
    this.displayedComplaints = this.mangmentComplaints as Complaint[];


    classList.add("active")
     this.serviceElemnt.nativeElement.classList.remove("active")


  }
  showServiceComplaint(categoryDiv: HTMLElement) {
    this.onmangmentComplaints = false ;

    const classList = categoryDiv.classList;
    this.displayedComplaints = this.serviceComplaints;


    classList.add('active')
    this.mangmentElemnt.nativeElement.classList.remove("active")

  }

  getSelectedComplaint(complaint : HTMLElement) : MangmentComplaint {
    const parentNode : HTMLElement =complaint.parentElement ;
    const selectedCompiant =  this.mangmentComplaints.find(_complaint => {
      
      if(_complaint.id == Number(parentNode.children[0].innerHTML))
      return true ;
        
    } )     
    

    this.plzreplace = false;
    const mc : MangmentComplaint  = {
      id : selectedCompiant.id ,
      content : selectedCompiant.content , 
      name : "zrm zrmbo" ,
      applyDate : new Date(),
      
    } ;
    // console.log(mc);

    
    
    complaint.children[0];
    this.router.navigate(['complaint/'+mc.id],{ relativeTo :  this.activeRoute })
    
    this.complaintListService.setSelectedComplaint(selectedCompiant);
    return mc ;

  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.searchsubscription.unsubscribe();
  }

}
