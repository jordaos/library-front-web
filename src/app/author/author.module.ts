import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms"

import { AuthorFormComponent } from './pages/form/author-form.component';
import { AuthorListComponent } from './pages/list/author-list.component';
import { AuthorService } from './author.service';

import { AuthorRoutingModule } from './author-routing.module';

@NgModule({
    imports: [
        AuthorRoutingModule,
        CommonModule,
        FormsModule
    ],
    exports: [ AuthorListComponent ],
    declarations: [
        AuthorListComponent,
        AuthorFormComponent
    ],
    providers: [ AuthorService ],
})
export class AuthorModule { }