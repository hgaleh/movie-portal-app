import { NgModule } from "@angular/core";
import { ThumbnailComponent } from "./component/thumbnail/thumbnail.component";

@NgModule({
    declarations: [
        ThumbnailComponent
    ],
    exports: [
        ThumbnailComponent
    ]
})
export class ThumbnailModule { }