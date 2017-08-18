import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AuthorListComponent } from "./author-list.component";

const authorRoutes: Routes = [
    {
        path: 'authors',
        component: AuthorListComponent,
    }
    
];

@NgModule({
    declarations: [],
    imports: [ RouterModule.forChild(authorRoutes) ],
    exports: [ RouterModule ],
    providers: [],
})
export class AuthorRoutingModule {}