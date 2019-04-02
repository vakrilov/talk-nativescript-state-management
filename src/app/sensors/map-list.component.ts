import { Component, OnInit } from "@angular/core";

import { Sensor } from "./sensor.model";
import { SensorService } from "./sensor.service";
import { MapBoxAccessToken } from "../../constants";
import { MapboxViewApi, MapboxMarker } from "nativescript-mapbox";
import { RouterExtensions } from "nativescript-angular/router";

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

    constructor(private service: SensorService, private router: RouterExtensions) { }

    ngOnInit(): void {
        this.sensors = this.service.getItems();
    }

    onMapReady(args): void {
        this.mapView = args.map;
        this.renderMap();
    }

    selectSensor(selectedSensor: SensorVM, shouldNavigate: boolean = false) {
        console.log('---> selectSensor', selectedSensor.id);

        const selectSameSensor = this.currentSensor && this.currentSensor.id === selectedSensor.id;

        if (selectSameSensor && shouldNavigate) {
            console.log('----> Navigate to sensor!');
            this.router.navigateByUrl("/sensor/" + selectedSensor.id)
            return;
        }

        if (!selectSameSensor) {
            selectedSensor.marker.update({ ...selectedSensor.marker, selected: true });
        }

        this.currentSensor = selectedSensor;
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
