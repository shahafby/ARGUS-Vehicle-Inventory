export class Vehicle {
    name: String;
    type: VehicleType;
    timeCreated: Date;
    constructor(newName: String, newType: VehicleType) {
        this.name = newName;
        this.type = newType;
        this.timeCreated = new Date();
    }
}
export enum VehicleType {
    SUV,
    Truck,
    Hybrid,
}
