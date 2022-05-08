import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
  providedIn: "root",
})
export class SuperadminService {
  constructor(private http: HttpClient) {}

  public ioot() {
    
    return this.http.get('https://api.thingspeak.com/channels/1693210/feeds.json?api_key=HYD2GM1961DCOWH7&results=10');
  }
}
