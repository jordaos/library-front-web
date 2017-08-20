import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { PageNotFoundComponent }  from './../errors/not_found.component';
import { PubFormComponent } from './pages/form/pub-form.component';
import { PubListComponent } from './pages/list/pub-list.component';

const pubRoutes: Routes = [
    {
        path: 'pub',
        component: PubListComponent
    },

    {
        path: 'pub/save',
        component: PubFormComponent
    },

    {
        path: 'pub/save/:id',
        component: PubFormComponent
    }
];

@NgModule({
    declarations: [],
    imports: [ RouterModule.forChild(pubRoutes) ],
    exports: [ RouterModule ],
    providers: [],
})
export class PubRoutingModule {}