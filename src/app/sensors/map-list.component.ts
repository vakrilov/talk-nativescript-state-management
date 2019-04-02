import { Component, OnInit } from "@angular/core";

import { Sensor } from "./sensor.model";
import { SensorService } from "./sensor.service";
import { MapBoxAccessToken } from "../../constants";
import { MapboxViewApi, MapboxMarker } from "nativescript-mapbox";

type SensorVM = Sensor & { marker?: MapboxMarker };

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./map-list.component.html"
})
export class MapListComponent implements OnInit {
    mapBoxToken: string = MapBoxAccessToken;
    sensors: Array<SensorVM>;
    currentSensor: SensorVM;
    mapView: MapboxViewApi;

    constructor(private service: SensorService) { }

    ngOnInit(): void {
        this.sensors = this.service.getItems();
    }

    onMapReady(args): void {
        this.mapView = args.map;
        this.renderMap();
    }

    selectSensor(selectedSensor: Sensor) {
        console.log('---> selectSensor', selectedSensor.id);
        if (this.currentSensor) {
            if (this.currentSensor === selectedSensor) {
                console.log('----> Navigate to customer!');
                return;
            } else {
                this.currentSensor.marker.update({ ...this.currentSensor.marker, selected: false });
                this.currentSensor = null;
            }
        }

        this.currentSensor = selectedSensor;
        this.currentSensor.marker.update({ ...this.currentSensor.marker, selected: true });
    }

    private createMarker(s: SensorVM): MapboxMarker {
        return {
            id: s.id,
            ...s.location,
            title: s.description,
            subtitle: s.value + "",
            onTap: zonedCallback(() => this.selectSensor(s)),
            onCalloutTap: zonedCallback(() => this.selectSensor(s)),
        };
    }

    renderMap() {
        if (!this.mapView || !this.sensors) {
            return;
        }

        this.sensors.forEach((c) => {
            c.marker = this.createMarker(c);
            return c.marker;
        });

        this.mapView.addMarkers(this.sensors.map(c => c.marker));
    }
}
