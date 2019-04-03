import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { MapListComponent } from "./sensors/map-list.component";
import { SensorDetailComponent } from "./sensors/sensor-detail.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./login/state/auth-guard.service";

const routes: Routes = [
    { path: "", redirectTo: "/map", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "map", component: MapListComponent, canActivate: [AuthGuard] },
    { path: "sensor/:id", component: SensorDetailComponent, canActivate: [AuthGuard]  }
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
