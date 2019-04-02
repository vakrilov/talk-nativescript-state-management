import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges, OnDestroy, ChangeDetectionStrategy } from "@angular/core";

import { MapboxMarker, MapboxViewApi } from "nativescript-mapbox";
import { registerElement } from "nativescript-angular/element-registry";
import { Placeholder } from "tns-core-modules/ui/placeholder";
import { Sensor } from "./state/sensor.model";

registerElement("ns-map-marker", () => Placeholder, { skipAddToDom: true })
@Component({
  selector: "ns-map-marker",
  moduleId: module.id,
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapMarkerComponent implements OnChanges, OnDestroy {
  @Input() mapBoxViewApi: MapboxViewApi;

  @Input() id: any;
  @Input() title: string;
  @Input() subtitle: string;
  @Input() lat: number;
  @Input() lng: number;
  @Input() selected: boolean;
  @Output() tap: EventEmitter<Sensor> = new EventEmitter<Sensor>();
  @Output() calloutTap: EventEmitter<Sensor> = new EventEmitter<Sensor>();

  private marker: MapboxMarker;
  private markerAdded: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.mapBoxViewApi && !this.markerAdded) {
      console.log("Adding marker", this.id)
      this.marker = this.createMarker();
      this.mapBoxViewApi.addMarkers([this.marker]);
      this.markerAdded = true;
    }

    if (changes.selected && this.marker && this.marker.update) {
      console.log("Updating marker", this.id)
      this.marker.update({ ...this.marker, selected: changes.selected.currentValue });
    }
  }

  ngOnDestroy() {
    if (this.mapBoxViewApi) {
      console.log("Removing marker", this.id);
      this.mapBoxViewApi.removeMarkers([this.id]);
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