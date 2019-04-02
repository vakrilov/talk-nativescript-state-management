import { Component, OnInit } from "@angular/core";

import { Sensor } from "./sensor.model";
import { SensorService } from "./sensor.service";
import { MapBoxAccessToken } from "../../constants";
import { MapboxViewApi } from "nativescript-mapbox";
@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./map-list.component.html"
})
export class MapListComponent implements OnInit {
    mapBoxToken: string = MapBoxAccessToken;
    sensors: Array<Sensor>;
    currentSensor: Sensor;
    mapView: MapboxViewApi;

    constructor(private service: SensorService) { }

    ngOnInit(): void {
        this.sensors = this.service.getItems();
    }

    onMapReady(args): void {
        this.mapView = args.map;
    }

    selectSensor(selectedSensor: Sensor) {
        console.log('---> selectSensor', selectedSensor.id);
        if (this.currentSensor) {
            if (this.currentSensor === selectedSensor) {
                console.log('----> Navigate to customer!');
                return;
            } else {
                // this.currentCustomer.marker.update({ ...this.currentCustomer.marker, selected: false });
                this.currentSensor = null;
            }
        }

        this.currentSensor = selectedSensor;
        // this.currentSensor.marker.update({ ...this.currentCustomer.marker, selected: true });
    }
}
