import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms"

import { PublisherService } from './publisher.service';

import { PublisherRoutingModule } from './publisher-routing.module';

import { PublisherFormComponent } from './pages/form/publisher-form.component';
import { PublisherListComponent } from './pages/list/publisher-list.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PublisherRoutingModule,
    ],
    exports: [ PublisherListComponent ],
    declarations: [
        PublisherFormComponent,
        PublisherListComponent
    ],
    providers: [ PublisherService ],
})
export class PublisherModule { }