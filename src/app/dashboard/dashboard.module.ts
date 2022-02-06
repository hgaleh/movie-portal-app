import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgbCarouselModule } from "@ng-bootstrap/ng-bootstrap";
import { GridModule } from "src/shared/grid/grid.module";
import { ThumbnailModule } from "src/shared/thumbnail/thumbnail.module";
import { DashboardComponent } from "./component/dashboard/dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        GridModule,
        ThumbnailModule,
        DashboardRoutingModule,
        CommonModule
    ]
})
export class DashboardModule {

}