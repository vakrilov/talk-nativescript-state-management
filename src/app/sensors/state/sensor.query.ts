import { Injectable } from '@angular/core';
import { SensorsState, SensorsStore } from './sensor.store';
import { QueryEntity } from '@datorama/akita';
import { Sensor } from '~/app/sensors/state/sensor.model';

@Injectable({
    providedIn: 'root'
})
export class SensorsQuery extends QueryEntity<SensorsState, Sensor, string> {
    constructor(protected store: SensorsStore) {
        super(store);
    }
}
