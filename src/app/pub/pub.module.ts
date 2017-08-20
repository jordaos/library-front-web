import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms"

import { PubService } from './pub.service';

import { PubRoutingModule } from './pub-routing.module';

import { PubFormComponent } from './pages/form/pub-form.component';
import { PubListComponent } from './pages/list/pub-list.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PubRoutingModule,
    ],
    exports: [ PubListComponent ],
    declarations: [
        PubFormComponent,
        PubListComponent
    ],
    providers: [ PubService ],
})
export class PubModule { }