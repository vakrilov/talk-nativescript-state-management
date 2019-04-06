import { Injectable } from '@angular/core';
import { StoreConfig, EntityStore, EntityState, ActiveState } from '@datorama/akita';
import { Sensor } from './sensor.model';

export interface SensorsState extends EntityState<Sensor>, ActiveState<string> {
}
const initialState = {
    active: null
};

@Injectable({
    providedIn: 'root'
})
@StoreConfig({ name: 'sensors' })
export class SensorsStore extends EntityStore<SensorsState, Sensor, string> {
    constructor() {
        super(initialState);
        console.log("SensorsStore constructor")
    }
}