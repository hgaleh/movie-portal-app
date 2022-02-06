import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FavoriteComponent } from "./component/favorite/favorite.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: FavoriteComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class FavoriteRoutingModule { }