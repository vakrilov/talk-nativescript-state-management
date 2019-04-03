import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { MapListComponent } from "./sensors/map-list.component";
import { SensorDetail } from "./sensors/sensor-detail.component";

const routes: Routes = [
  { path: "", redirectTo: "/map", pathMatch: "full" },
  { path: "map", component: MapListComponent },
  { path: "sensor/:id", component: SensorDetail }
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
