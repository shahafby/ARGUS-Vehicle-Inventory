import { Component, OnInit } from '@angular/core';
import { Vehicle, VehicleType } from '../../Objects/vehicle';
import {FormControl, Validators} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DeleteConfirmDialogComponent } from '../dialogs/delete-confirm-dialog/delete-confirm-dialog.component';
import { ServerService } from '../server.service';

export interface Type {
  value: VehicleType;
  viewValue: string;
}
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  vehicleToUpdateIndex = 0;
  vehicltTypeControl = new FormControl('', [Validators.required]);
  vehicltNameControl = new FormControl('', [Validators.required]);
  editVehicltTypeControl = new FormControl('', [Validators.required]);
  editVehicltNameControl = new FormControl('', [Validators.required]);
  newVehicleName: string;
  editVehicleName: string;
  vehicles: Vehicle[] = [{name: 'first', type: VehicleType.SUV, timeCreated: new Date().toLocaleString()}];
  selectedVehicleType: Type;
  editSelectedVehicleType: Type;
  vehicleTypes: Type[] = [
    {value: VehicleType.SUV, viewValue: 'SUV' },
    {value: VehicleType.Truck, viewValue: 'Truck'},
    {value: VehicleType.Hybrid, viewValue: 'Hybrid'}
  ];

  deleteConfirmDialogComponent: MatDialogRef<DeleteConfirmDialogComponent>;

  constructor(private dialog: MatDialog, private serverService: ServerService) { }

  ngOnInit() {
    this.serverService.getAllVehicles();
    this.serverService.vehiclesArray
    .subscribe(vehiclesArray => {
      this.vehicles = vehiclesArray;
    });
   }

  addVehicle() {
    const newVehicle = new Vehicle(this.newVehicleName, this.selectedVehicleType.value);
    this.vehicles.push(newVehicle);
    this.vehicltTypeControl.reset();
    this.vehicltNameControl.reset();
    this.serverService.addVehicle(newVehicle);
  }

  updateVehicle() {
    console.log(this.vehicleToUpdateIndex);
    this.editVehicltTypeControl.reset();
    this.editVehicltNameControl.reset();
  }

  openDeleteVehicleDialog() {
    this.deleteConfirmDialogComponent = this.dialog.open(DeleteConfirmDialogComponent);
  }

}
