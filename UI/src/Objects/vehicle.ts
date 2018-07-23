export class Vehicle {
    name: String;
    type: VehicleType;
    timeCreated: Date;
    constructor(newName: String, newType: VehicleType, newTimeCreated: Date) {
        this.name = newName;
        this.type = newType;
        this.timeCreated = newTimeCreated;
    }
}
export enum VehicleType {
    SUV,
    Truck,
    Hybrid,
}
