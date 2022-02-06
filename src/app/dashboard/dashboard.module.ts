import { NgModule } from "@angular/core";
import { GridModule } from "src/shared/grid/grid.module";
import { DashboardComponent } from "./component/dashboard/dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        GridModule,
        DashboardRoutingModule
    ]
})
export class DashboardModule {

}