import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { SensorsState, SensorsStore } from './sensor.store';
import { Sensor } from './sensor.model';

@Injectable({
    providedIn: 'root'
})
export class SensorsQuery extends QueryEntity<SensorsState, Sensor, string> {
    constructor(protected store: SensorsStore) {
        super(store);
    }
}
