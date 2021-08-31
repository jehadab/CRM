import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, MultiDataSet, SingleDataSet } from 'ng2-charts';
import { Statics } from 'src/app/shered/statics.component';
// import { Chart, LineController, LineElement, PointElement, LinearScale, Title, DoughnutController, ArcElement } from 'chart.js'

// Chart.register(LineController, LineElement, PointElement, LinearScale , DoughnutController , ArcElement, Title);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public complaintTypeRatio : any[] = [] ;
  public doneToNot : any[] = [] ;
  public serviceDoneToNot : any[] = [] ;
  public ManagmentDoneToNot : any[] = [] ;

  
  // public doughnutChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  // public doughnutChartData = [120, 150, 180, 90];
  // public doughnutChartType = 'doughnut';

  public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: MultiDataSet = [
    [350, 450, 100],
    [50, 150, 120],
    [250, 130, 70],
  ];
  public doughnutChartType: ChartType = 'doughnut';


  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['الشكاوي الخدمية'], ["الشكاوي الادارية"]];
  public pieChartData: SingleDataSet = this.complaintTypeRatio;
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  
  public pieChartOptions1: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels1: Label[] = [['الشكاوي المنجزة'], ["الشكاوي الغير منجزة"]];
  public pieChartData1: SingleDataSet = this.doneToNot;
  public pieChartType1: ChartType = 'pie';
  public pieChartLegend1 = true;
  public pieChartPlugins1 = [];

  public polarAreaChartLabels: Label[] = ['الشكاوي الإدارية المنجزة' , 'الشكاوي الإدارية الغير منجزة'];
  public polarAreaChartData: SingleDataSet = this.ManagmentDoneToNot;
  public polarAreaLegend = true;

  public polarAreaChartType: ChartType = 'polarArea';

  public polarAreaChartLabels1: Label[] = ['الشكاوي الخدمية المنجزة' , 'الشكاوي الخدمية الغير منجزة'];
  public polarAreaChartData1: SingleDataSet = this.serviceDoneToNot;
  public polarAreaLegend1 = true;

  public polarAreaChartType1 : ChartType = 'polarArea';



  // @ViewChild('canv1') canv: ElementRef<HTMLCanvasElement>;
  // public context: CanvasRenderingContext2D;
  // public canvas: any;

  // public chartEmail;
  constructor(private http : HttpClient) { }

  ngOnInit() {
    this.http.get(Statics.API_HOST + "report/all").subscribe((res : any) =>{

      this.complaintTypeRatio.push(res.complaintPercentage.finishedComplaintCount);
      this.complaintTypeRatio.push(res.complaintPercentage.complaintCount);

      this.doneToNot.push(res.managementVSservices.complaintServiceCount);
      this.doneToNot.push(res.managementVSservices.complaintManagementCount);

      this.serviceDoneToNot.push(res.complaintServicePercentage.complaintServiceCount);
      this.serviceDoneToNot.push(res.complaintServicePercentage.complaintCount);
      
      this.ManagmentDoneToNot.push(res.complaintManagementPercentage.complaintManagementCount);   
      this.ManagmentDoneToNot.push(res.complaintManagementPercentage.complaintCount);   
      console.log(res);
      
    },err=>{

    })
   }
}
