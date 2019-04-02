import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Sensor } from "./sensor.model";
import { SensorService } from "./sensor.service";

@Component({
  selector: "ns-details",
  moduleId: module.id,
  templateUrl: "./sensor-detail.component.html"
})

export class SensorDetailComponent {
    sensor: Sensor;

    constructor(
        private service: SensorService,
        private route: ActivatedRoute
    ) {
        const id = this.route.snapshot.params.id;
        this.sensor = this.service.getItem(id);
    }

}
