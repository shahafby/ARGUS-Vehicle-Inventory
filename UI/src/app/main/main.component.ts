import { Component, OnInit } from '@angular/core';
import { Vehicle, VehicleType } from '../../Objects/vehicle';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  newVehicleName: String;
  newVehicleType: VehicleType;
  vehicles = [];
  vehicleTypeText = 'Choose the type of car';
  vehicleTypes: String[] = ['SUV', 'Truck', 'Hybrid'];

  constructor() { }

  ngOnInit() {
  }

  addVehicle() {
    switch (this.vehicleTypeText) {
      case 'SUV':
        this.newVehicleType = VehicleType.SUV;
        break;
      case 'Truck':
        this.newVehicleType = VehicleType.Truck;
        break;
      case 'Hybrid':
        this.newVehicleType = VehicleType.Hybrid;
        break;
    }
    const newVehicle = new Vehicle(this.newVehicleName, this.newVehicleType);
    this.vehicles.push(newVehicle);
    this.newVehicleName = '';
    this.vehicleTypeText = 'Choose the type of car';
  }
}
