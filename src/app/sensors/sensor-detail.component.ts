import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Sensor } from "./state/sensor.model";
import { SensorsQuery } from "./state/sensor.query";

@Component({
  selector: "ns-details",
  moduleId: module.id,
  templateUrl: "./sensor-detail.component.html"
})

export class SensorDetailComponent {
    sensor: Sensor;

    constructor(
        private service: SensorsQuery,
        private route: ActivatedRoute
    ) {
        const id = this.route.snapshot.params.id;
        this.sensor = this.service.getEntity(id);
    }

}
