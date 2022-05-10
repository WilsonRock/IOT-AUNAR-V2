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
  val = 15;
  lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 79], label: 'Temperaturas' },
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
    this.cargarData('https://api.thingspeak.com/channels/1693210/feeds.json?api_key=HYD2GM1961DCOWH7&results=10');




  }
  public cargarData(Api1: any) {
    let res ;
    console.log("respuesta", Api1);
    this.adminService.ioot().subscribe((respuesta: any) => {
      console.log(...(respuesta.feeds[0].field1));
      const gaugeElement = document.querySelector(".gauge");
      res=(respuesta.feeds[0].field1/100);
      function setGaugeValue(gauge, value) {
        if (value < 0 || value > 1) {
          return;
        }

        gauge.querySelector(".gauge__fill").style.transform = `rotate(${value / 2
          }turn)`;
        gauge.querySelector(".gauge__cover").textContent = `${Math.round(
          value * 100
        )}C°`;
      }

      setGaugeValue(gaugeElement, res);


    })

  }


}