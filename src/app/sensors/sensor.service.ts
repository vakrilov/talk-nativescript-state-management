import { Injectable } from "@angular/core";

import { Sensor } from "./sensor.model";

@Injectable({
    providedIn: "root"
})
export class SensorService {
    private items:Array<Sensor> = [
        { id: "1", description: "first", location: { latitude: 52.3680, longitude: 4.9036 }, value: 5 },
        { id: "2", description: "second", location: { latitude: 52.3690, longitude: 4.9026 }, value: 10 }
    ]

    getItems(): Array<Sensor> {
        return this.items;
    }

    getItem(id: string): Sensor {
        return this.items.filter((item) => item.id === id)[0];
    }
}
