import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { MapboxViewApi } from "nativescript-mapbox";
import { RouterExtensions } from "nativescript-angular/router";

import { MapBoxAccessToken } from "../../constants";
import { Sensor, SensorsQuery, SensorsStore } from "./state";

@Component({
  selector: "ns-items",
  moduleId: module.id,
  templateUrl: "./map-list.component.html"
})
export class MapListComponent implements OnInit {
  mapBoxToken: string = MapBoxAccessToken;
  mapBoxViewApi: MapboxViewApi;

  sensors$: Observable<Sensor[]>;
  active$: Observable<Sensor>;

  constructor(private query: SensorsQuery, private store: SensorsStore, private router: RouterExtensions) { }

  ngOnInit(): void {
    this.sensors$ = this.query.selectAll();
    this.active$ = this.query.selectActive();
  }

  onMapReady(args): void {
    this.mapBoxViewApi = args.map;
  }

  selectSensor(sensor: Sensor, shouldNavigate: boolean = false) {
    const isSame = this.query.getActiveId() === sensor.id;

    if (isSame && shouldNavigate) {
      this.router.navigateByUrl("/sensor/" + sensor.id)
      return;
    }

    this.store.setActive(sensor.id);
  }
}