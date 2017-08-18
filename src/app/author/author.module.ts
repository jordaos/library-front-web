import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms"

/*import { AuthorFormComponent } from './author-form/author-form.component';
import { AuthorListComponent } from './author-list.component';*/
import { AuthorRoutingModule } from './author-routing.module';
import { AuthorService } from './author.service';

@NgModule({
    imports: [ 
        AuthorRoutingModule, 
        CommonModule,
        FormsModule
    ],
    exports: [ /*AuthorListComponent*/ ],
    declarations: [
        /*AuthorListComponent,
        AuthorFormComponent*/
    ],
    providers: [ AuthorService ],
})
export class AuthorModule { }