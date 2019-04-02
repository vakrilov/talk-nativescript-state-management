import { Component, OnInit } from "@angular/core";

import { Sensor } from "./sensor.model";
import { SensorService } from "./sensor.service";
import { MapBoxAccessToken } from "../../constants";
import { MapboxViewApi, MapboxMarker } from "nativescript-mapbox";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./map-list.component.html"
})
export class MapListComponent implements OnInit {
    mapBoxToken: string = MapBoxAccessToken;
    mapView: MapboxViewApi;

    sensors: Array<Sensor>;
    currentSensorId: string;
    loading: boolean;

    constructor(private service: SensorService, private router: RouterExtensions) { }

    ngOnInit(): void {
        this.loading = true;
        this.service.getItems().subscribe((items) => {
            this.sensors = items;
            this.loading = false;
        });
    }

    onMapReady(args): void {
        this.mapView = args.map;
    }

    selectSensor(sensor: Sensor, shouldNavigate: boolean = false) {
        const isSame = this.currentSensorId === sensor.id;

        if (isSame && shouldNavigate) {
            this.router.navigateByUrl("/sensor/" + sensor.id)
            return;
        }

        this.currentSensorId = sensor.id;
    }
}