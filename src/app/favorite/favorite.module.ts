import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { GridModule } from "src/shared/grid/grid.module";
import { FavoriteComponent } from "./component/favorite/favorite.component";
import { FavoriteRoutingModule } from "./favorite-routing.module";

@NgModule({
    declarations: [
        FavoriteComponent
    ],
    imports: [
        GridModule,
        FavoriteRoutingModule,
        CommonModule
    ]
})
export class FavoriteModule { }