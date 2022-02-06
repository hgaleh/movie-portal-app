import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LaterComponent } from "./component/later/later.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: LaterComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class LaterRoutingModule { }