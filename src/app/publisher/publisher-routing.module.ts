import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { PageNotFoundComponent }  from './../errors/not_found.component';
import { PublisherFormComponent } from './pages/form/publisher-form.component';
import { PublisherListComponent } from './pages/list/publisher-list.component';

const publisherRoutes: Routes = [
    {
        path: 'publisher',
        component: PublisherListComponent
    },

    {
        path: 'publisher/save',
        component: PublisherFormComponent
    },

    {
        path: 'publisher/save/:id',
        component: PublisherFormComponent
    }
];

@NgModule({
    declarations: [],
    imports: [ RouterModule.forChild(publisherRoutes) ],
    exports: [ RouterModule ],
    providers: [],
})
export class PublisherRoutingModule {}