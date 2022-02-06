import { NgModule } from "@angular/core";
import { GridModule } from "src/shared/grid/grid.module";
import { LaterComponent } from "./component/later/later.component";
import { LaterRoutingModule } from "./later-routing.module";

@NgModule({
    declarations: [
        LaterComponent
    ],
    imports: [
        GridModule,
        LaterRoutingModule
    ]
})
export class LaterModule { }