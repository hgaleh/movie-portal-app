import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { ThumbnailComponent } from "./component/thumbnail/thumbnail.component";
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from "@angular/material/button";

@NgModule({
    declarations: [
        ThumbnailComponent
    ],
    exports: [
        ThumbnailComponent
    ],
    imports: [
        MatIconModule,
        MatMenuModule,
        MatButtonModule
    ]
})
export class ThumbnailModule { }