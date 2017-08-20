import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { MainComponent } from './main.component';
import { PageNotFoundComponent } from './errors/not_found.component';

import { AuthorModule } from './author/author.module';
import { PublisherModule } from './publisher/publisher.module';
import { PubModule } from './pub/pub.module';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PageNotFoundComponent
  ],
  imports: [
    AppRoutingModule,
    AuthorModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    PublisherModule,
    PubModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
