import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CarouselModule } from "src/shared/carousel/carousel.module";
import { GridModule } from "src/shared/grid/grid.module";
import { DashboardComponent } from "./component/dashboard/dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        GridModule,
        DashboardRoutingModule,
        CommonModule,
        CarouselModule
    ]
})
export class DashboardModule { }