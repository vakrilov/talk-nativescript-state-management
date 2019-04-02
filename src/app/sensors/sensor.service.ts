import { Injectable } from "@angular/core";

import { Sensor } from "./sensor.model";
import { Observable, of } from "rxjs";
import { delay } from 'rxjs/operators';
import { data as initialData } from './sensor.data';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SensorService {
  public sensors$ = new BehaviorSubject<Sensor[]>(initialData);

  getItems(): Observable<Sensor[]> {
    return this.sensors$.pipe(
      delay(4000)
    );
  }

  getItem(id: string): Sensor {
    return this.sensors$.value.filter((item) => item.id === id)[0];
  }
}
