import { NgModule } from "@angular/core";
import { GridComponent } from "./component/grid/grid.component";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        GridComponent
    ],
    exports: [
        GridComponent
    ],
    imports: [
        InfiniteScrollModule,
        CommonModule
    ]
})
export class GridModule { }