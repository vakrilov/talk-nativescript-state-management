import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { MapboxViewApi } from "nativescript-mapbox";
import { RouterExtensions } from "nativescript-angular/router";

import { MapBoxAccessToken } from "../../constants";
import { Sensor, SensorsService } from "./state";
import { LoginService } from "../login/state";
import {  } from "./state/sensor.service";

@Component({
  selector: "ns-items",
  moduleId: module.id,
  templateUrl: "./map-list.component.html"
})
export class MapListComponent implements OnInit {
  mapBoxToken: string = MapBoxAccessToken;
  mapBoxViewApi: MapboxViewApi;

  sensors$: Observable<Sensor[]>;
  activeId$: Observable<string>;

  constructor(
    private service: SensorsService,
    private router: RouterExtensions,
    private login: LoginService) { }

  ngOnInit(): void {
    this.sensors$ = this.service.loadSensors();
    this.activeId$ = this.service.query.selectActiveId();
  }

  selectSensor(sensor: Sensor, shouldNavigate: boolean = false) {
    if (shouldNavigate && this.service.query.getActiveId() === sensor.id) {
      this.router.navigateByUrl("/sensor/" + sensor.id)
      return;
    }

    this.service.store.setActive(sensor.id);
  }
  
  logout() {
    this.login.logout().then(() => {
      this.router.navigateByUrl("/login", { clearHistory: true });
    })
  }
}
