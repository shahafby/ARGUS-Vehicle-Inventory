import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class ServerService {

  loader: Boolean = false;
  private vehicles = new BehaviorSubject<any>('');
  vehiclesArray = this.vehicles.asObservable();

  constructor(private http: HttpClient) { }

  private serverURL = 'http://localhost:3000';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  getAllVehicles() {
    this.loader = true;
    this.http.get(`${this.serverURL}/getVehicles`, this.httpOptions)
      .subscribe(results => {
        this.vehicles.next(results);
        this.loader = false;
      });
  }

  addVehicle(vehicle) {
    this.loader = true;
    this.http.put(`${this.serverURL}/addVehicle`, vehicle, this.httpOptions)
      .subscribe(results => {
        this.getAllVehicles();
       });
  }

  deleteVehicle(id) {
    this.http.delete(`${this.serverURL}/deleteVehicle/${id}`, this.httpOptions).subscribe(res => { });
  }

  updateVehicle(id, data) {
    this.http.post(`${this.serverURL}/updateVehicle/${id}`, data, this.httpOptions).subscribe(res => { });
  }
}
