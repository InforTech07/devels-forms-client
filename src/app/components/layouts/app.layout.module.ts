import { NgModule } from '@angular/core';
import { SimpleLayoutComponent } from './simple-layout/simple.layout.component';
import { FullLayoutComponent } from './full-layout/full.layout.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        SimpleLayoutComponent,
        FullLayoutComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
    ],
    exports: [
        SimpleLayoutComponent,
        FullLayoutComponent
    ],
})
export class LayoutModule {}