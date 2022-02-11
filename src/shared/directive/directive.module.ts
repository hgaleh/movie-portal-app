import { NgModule } from "@angular/core";
import { ImageLoadingDirective } from "./image-loading.directive";

@NgModule({
    declarations: [
        ImageLoadingDirective
    ],
    exports: [
        ImageLoadingDirective
    ]
})
export class DirectiveModule { }