import { Component, } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { SuperadminService } from '../services/superadmin.service';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})

export class LineChartComponent {


  
  lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Temperaturas' },
  ];

  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';



  constructor(  private adminService: SuperadminService){
    this.cargarData('https://api.thingspeak.com/channels/1693210/feeds.json?api_key=HYD2GM1961DCOWH7&results=10');
    
 }



 public cargarData( Api1 :any){
   console.log("respuesta",Api1);
   this.adminService.ioot().subscribe ((respuesta: any) => {
     console.log(...respuesta.feeds);
    

    })
      
  }
}


