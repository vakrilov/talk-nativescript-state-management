import { Component, OnInit } from "@angular/core";

import { Sensor } from "./sensor.model";
import { SensorService } from "./sensor.service";
import { MapBoxAccessToken } from "../../constants";
import { MapboxViewApi, MapboxMarker } from "nativescript-mapbox";
import { RouterExtensions } from "nativescript-angular/router";
import { Observable } from "rxjs";

@Component({
  selector: "ns-items",
  moduleId: module.id,
  templateUrl: "./map-list.component.html"
})
export class MapListComponent implements OnInit {
  mapBoxToken: string = MapBoxAccessToken;
  mapBoxViewApi: MapboxViewApi;

  sensors$: Observable<Sensor[]>;
  currentSensorId: string;

  constructor(private service: SensorService, private router: RouterExtensions) { }

  ngOnInit(): void {
    this.sensors$ = this.service.getItems();
  }

  onMapReady(args): void {
    this.mapBoxViewApi = args.map;
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