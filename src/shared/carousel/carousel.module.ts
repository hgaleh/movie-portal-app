import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DirectiveModule } from "../directive/directive.module";
import { CarouselComponent } from "./component/carousel/carousel.component";

@NgModule({
    declarations: [
        CarouselComponent
    ],
    imports: [
        CommonModule,
        DirectiveModule
    ],
    exports: [
        CarouselComponent
    ]
})
export class CarouselModule { }