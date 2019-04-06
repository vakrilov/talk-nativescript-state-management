import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sensor } from './sensor.model';
import { SensorsQuery } from './sensor.query';
import { SensorsStore } from './sensor.store';
import { data as initialData } from './sensor.data';

@Injectable({
    providedIn: 'root'
})
export class SensorsService {
    constructor(public store: SensorsStore, public query: SensorsQuery) { }

    public loadSensors(): Observable<Sensor[]> {
        if (this.query.getCount() === 0) {
            setTimeout(() => {
                this.store.set(initialData);
            }, 1000);
        }

        return this.query.selectAll();
    }
}