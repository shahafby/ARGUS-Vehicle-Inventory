export class Vehicle {
    name: string;
    type: VehicleType;
    timeCreated: string;
    _id;
    constructor(newName: string, newType: VehicleType) {
        this.name = newName;
        this.type = newType;
        this.timeCreated = new Date().toLocaleString();
    }
}
export enum VehicleType {
    SUV,
    Truck,
    Hybrid,
}
