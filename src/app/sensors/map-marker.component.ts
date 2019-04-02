import { Component, OnInit, SkipSelf, ElementRef, Input, Output, EventEmitter, SimpleChanges, OnChanges, OnDestroy, ChangeDetectionStrategy } from "@angular/core";

import { Sensor } from "./sensor.model";
import { MapListComponent } from "~/app/sensors/map-list.component";
import { MapboxMarker } from "nativescript-mapbox";
import { registerElement } from "nativescript-angular/element-registry";
import { Placeholder } from "tns-core-modules/ui/placeholder";

registerElement("ns-map-marker", () => Placeholder, { skipAddToDom: true })
@Component({
  selector: "ns-map-marker",
  moduleId: module.id,
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapMarkerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() id: any;
  @Input() title: string;
  @Input() subtitle: string;
  @Input() lat: number;
  @Input() lng: number;
  @Input() selected: boolean;
  @Output() tap: EventEmitter<Sensor> = new EventEmitter<Sensor>();
  @Output() calloutTap: EventEmitter<Sensor> = new EventEmitter<Sensor>();

  private marker: MapboxMarker;

  constructor(private map: MapListComponent) { }

  ngOnInit(): void {
    setTimeout(() => {
      if (this.map.mapView) {
        this.marker = this.createMarker();
        console.log("Adding marker", this.id)
        this.map.mapView.addMarkers([this.marker]);
      }
    }, 2000);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selected && this.marker && this.marker.update) {
      console.log("Updating marker", this.id)
      this.marker.update({ ...this.marker, selected: changes.selected.currentValue });
    }
  }

  ngOnDestroy() {
    if (this.map.mapView) {
      console.log("Removing marker", this.id)
      this.map.mapView.removeMarkers([this.id])
    }
  }

  private createMarker(): MapboxMarker {
    return {
      id: this.id,
      lat: this.lat,
      lng: this.lng,
      title: this.title,
      subtitle: this.subtitle + "",
      onTap: zonedCallback(() => this.tap.next(this.id)),
      onCalloutTap: zonedCallback(() => this.calloutTap.next(this.id)),
    };
  }
}
