import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
  providedIn: "root",
})
export class SuperadminService {
  constructor(private http: HttpClient) {}

  public ioot(Api) {
    console.log("Api", Api);
    return this.http.get(Api);
  }
}
