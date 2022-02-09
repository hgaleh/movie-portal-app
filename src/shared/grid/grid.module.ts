import { NgModule } from "@angular/core";
import { GridComponent } from "./component/grid/grid.component";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { CommonModule } from "@angular/common";
import { ThumbnailModule } from "../thumbnail/thumbnail.module";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";

@NgModule({
    declarations: [
        GridComponent
    ],
    exports: [
        GridComponent
    ],
    imports: [
        InfiniteScrollModule,
        CommonModule,
        ThumbnailModule,
        MatButtonModule,
        MatMenuModule
    ]
})
export class GridModule { }