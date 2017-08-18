import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { AuthorListComponent } from "./pages/list/author-list.component";
import { AuthorFormComponent } from "./pages/form/author-form.component";

import { PageNotFoundComponent }  from './../errors/not_found.component';

const authorRoutes: Routes = [
    {
        path: 'author',
        component: AuthorListComponent,
    },

    {
        path: 'author/save',
        component: AuthorFormComponent,
    },

    {
        path: 'author/save/:id',
        component: AuthorFormComponent,
    },

    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    declarations: [],
    imports: [ RouterModule.forChild(authorRoutes) ],
    exports: [ RouterModule ],
    providers: [],
})
export class AuthorRoutingModule {}