import { Store, StoreConfig, EntityStore, EntityState, ActiveState } from '@datorama/akita';
import { Sensor } from './sensor.model';
import { Injectable } from '@angular/core';
import { data as initialData } from './sensor.data';

export interface SensorsState extends EntityState<Sensor>, ActiveState<string> {
}
const initialState = {
    active: null
};

@Injectable({
    providedIn: 'root'
})
@StoreConfig({ name: 'session' })
export class SensorsStore extends EntityStore<SensorsState, Sensor, string> {
    constructor() {
        super(initialState);
        this.set(initialData);
    }
}