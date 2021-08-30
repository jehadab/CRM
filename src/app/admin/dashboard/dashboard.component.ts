import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, DoughnutController, ArcElement } from 'chart.js'

Chart.register(LineController, LineElement, PointElement, LinearScale , DoughnutController , ArcElement, Title);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // @ViewChild('canv1') canv: ElementRef<HTMLCanvasElement>;
  // public context: CanvasRenderingContext2D;
  // public canvas: any;
  public ctx ;
  public chartHours ;
   public chartColor  ;
  // public chartEmail;
  constructor() { }

  ngOnInit() {
//     this.chartColor = "#FFFFFF";

//     this.chartHours = document.getElementById("myChart");
    
//     this.ctx = this.chartHours.getContext("2d");
    

// //     const config = {
// //       type: 'doughnut',
// //       data: data,
// //       options: {
// //         responsive: true,
// //         plugins: {
// //           legend: {
// //             position: 'top',
// //           },
// //           title: {
// //             display: true,
// //             text: 'Chart.js Doughnut Chart'
// //           }
// //         }
// //       },
// //     };
// //     const DATA_COUNT = 5;
// // const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};

// // const data = {
// //   labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
// //   datasets: [
// //     {
// //       label: 'Dataset 1',
// //       data: Urils.numbers(NUMBER_CFG),
// //       backgroundColor: Object.values(Utils.CHART_COLORS),
// //     }
// //   ]
// // };
//      const data = {
//        labels: [
//          'Red',
//          'Blue',
//          'Yellow'
//        ],
//        datasets: [{
//          label: 'My First Dataset',
//          data: [100, 20, 5],
//          backgroundColor: [
//            'rgb(255, 99, 132)',
//            'rgb(54, 162, 235)',
//            'rgb(255, 205, 86)'
//          ],
//          hoverOffset: 4
//        }]
//      };

//     this.chartHours = new Chart(this.ctx, {
//       type: 'doughnut',
//       data :data, 
//       options: {
//           plugins: {
//               title: {
//                   display: true,
//                   text: 'Chart Title'
//               }
//           },
//           scales: {
//               x: {
//                   type: 'linear'
//               },
//               y: {
//                   type: 'linear'
//               }
//           }
//     }}  )
   }
}
