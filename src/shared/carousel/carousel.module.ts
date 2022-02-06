import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ThumbnailModule } from "../thumbnail/thumbnail.module";
import { CarouselComponent } from "./component/carousel/carousel.component";

@NgModule({
    declarations: [
        CarouselComponent
    ],
    imports: [
        CommonModule,
        ThumbnailModule
    ],
    exports: [
        CarouselComponent
    ]
})
export class CarouselModule { }