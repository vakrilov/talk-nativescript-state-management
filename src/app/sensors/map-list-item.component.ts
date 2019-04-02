import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Sensor } from '~/app/sensors/sensor.model';

@Component({
  selector: 'ns-map-list-item',
  templateUrl: './map-list-item.component.html',
  styleUrls: ['./map-list-item.component.css'],
  moduleId: module.id,
})
export class MapListItemComponent{
  @Input() sensor: Sensor;
  @Input() selected: boolean;
  @Output() select: EventEmitter<Sensor> = new EventEmitter<Sensor>();
}
