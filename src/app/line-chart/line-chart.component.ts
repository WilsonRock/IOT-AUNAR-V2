import { Component, } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { SuperadminService } from '../services/superadmin.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})

export class LineChartComponent {
  dataSource;
  val = 15;
  check: boolean = false;
  lineChartData: ChartDataSets[] = [
    /* { data: [85, 72, 78, 75, 77, 79], label: 'Temperaturas' }, */
  ];
  JustGage;

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
  constructor(private adminService: SuperadminService) {
    
    this.getTempSensor('https://api.thingspeak.com/channels/1693210/feeds.json?api_key=HYD2GM1961DCOWH7&results=10');
    this.cargarData('https://api.thingspeak.com/channels/1693210/feeds.json?api_key=HYD2GM1961DCOWH7&results=10');


  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    
  }
  public cargarData(Api1: any) {
    let res ;
    console.log("respuesta", Api1);
    this.adminService.ioot(Api1).subscribe((respuesta: any) => {
      console.log(...(respuesta.feeds[0].field1));
      const gaugeElement = document.querySelector(".gauge");
      res=(respuesta.feeds[9].field1/100);
      function setGaugeValue(gauge, value) {
        if (value < 0 || value > 1) {
          return;
        }

        gauge.querySelector(".gauge__fill1").style.transform = `rotate(${value / 2
          }turn)`;
        gauge.querySelector(".gauge__cover1").textContent = `${Math.round(
          value * 100
        )}%H`;
      }

      setGaugeValue(gaugeElement, res);


    })

  }
  getTempSensor(Api1) {
    let temp=[];
    this.adminService.ioot(Api1).subscribe((data: any) => {
      this.dataSource = data.feeds;
      data.feeds.forEach(element => {
        temp.push(element.field2);
      });
      this.lineChartData = [
        { data: temp, label: 'Temperaturas' },
      ];
      this.check = true;
    })

    setTimeout(() => {
      this.check = true;
      this.getTempSensor('https://api.thingspeak.com/channels/1693210/feeds.json?api_key=HYD2GM1961DCOWH7&results=10');
      this.cargarData('https://api.thingspeak.com/channels/1693210/feeds.json?api_key=HYD2GM1961DCOWH7&results=10');
      console.log("check", this.check);
    }, 30000);

  }
  

 
}