import { Component, } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { SuperadminService } from '../services/superadmin.service';

@Component({
  selector: 'app-gauge',
  /* templateUrl: './line-chart.component.html', */
  /* styleUrls: ['./line-chart.component.css'], */
  template: `
  <h2>  Gaugh Chart</h2>
   <div *ngIf="gauge_ChartData"  id="gauge_chart" [chartData]="gauge_ChartData" [chartOptions]= "gauge_ChartOptions" chartType="Gauge" GoogleChart></div>
   <h2>  Area Chart</h2>`







})

export class GaugeComponent {
  gauge_ChartData:{};
  res;
  val = 15;
  constructor(private adminService: SuperadminService) {
    this.cargarData('https://api.thingspeak.com/channels/1693210/feeds.json?api_key=HYD2GM1961DCOWH7&results=10');




  }
  public cargarData(Api1: any) {

    console.log("respuesta", Api1);
    this.adminService.ioot().subscribe((respuesta: any) => {
      console.log(...(respuesta.feeds[0].field1));
      const gaugeElement = document.querySelector(".gauge");
      this.res = (respuesta.feeds[0].field1 / 100);
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
       
      setGaugeValue(gaugeElement, this.res);


    })


  }

/*  public gauge_ChartData = [
    ['Label', 'Value'],
    ['Systolic', 10],
    ['Diastolic', 80]];  */
  public gauge_ChartOptions = {
    width: 400, height: 120,
    redFrom: 90, redTo: 100,
    yellowFrom: 75, yellowTo: 90,
    minorTicks: 5
  };


}