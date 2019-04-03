import { Injectable } from "@angular/core";

import { Sensor } from "./sensor.model";
import { Observable, of } from "rxjs";
import { delay } from 'rxjs/operators';
import { data as initialData } from './sensor.data';

@Injectable({
    providedIn: "root"
})
export class SensorService {
    getItems(): Observable<Sensor[]> {
        return of(initialData).pipe(
            delay(4000)
        );
    }

    getItem(id: string): Sensor {
        return initialData.filter((item) => item.id === id)[0];
    }
}
