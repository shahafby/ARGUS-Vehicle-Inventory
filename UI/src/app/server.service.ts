import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private vehicles = new BehaviorSubject<any>('');
  vehiclesArray = this.vehicles.asObservable();
  constructor(private http: HttpClient ) { }

  private serverURL = 'http://localhost:3000';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  getAllVehicles() {
    this.http.get(`${this.serverURL}/getVehicles`, this.httpOptions)
          .subscribe(results => {
            this.vehicles.next(results);
          });
  }

  addVehicle(vehicle) {
    console.log(`${this.serverURL}/addVehicle`, vehicle, this.httpOptions);
    this.http.put(`${this.serverURL}/addVehicle`, vehicle, this.httpOptions)
    .subscribe(results => {

    });
  }
}
