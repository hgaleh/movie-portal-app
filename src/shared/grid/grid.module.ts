import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { GridComponent } from "./component/grid/grid.component";
import { ThumbnailComponent } from "./component/thumbnail/thumbnail.component";
import { DecadePipe } from "./pipe/decade.pipe";

@NgModule({
    declarations: [
        GridComponent,
        ThumbnailComponent,
        DecadePipe
    ],
    exports: [
        GridComponent
    ],
    imports: [
        InfiniteScrollModule,
        CommonModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule
    ]
})
export class GridModule { }