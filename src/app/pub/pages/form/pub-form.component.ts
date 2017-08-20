import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { PubService } from './../../pub.service';
import { AuthorService } from './../../../author/author.service';
import { PublisherService } from './../../../publisher/publisher.service';

import { Author } from './../../../author/author.model';
import { Publisher } from './../../../publisher/publisher.model';
import { Pub } from './../../pub.model';
import { PubType } from './../../pub-type.enum';

@Component({
    selector: 'pub-form',
    templateUrl: './pub-form.component.html',
    styleUrls: ['./pub-form.component.css']
})

export class PubFormComponent implements OnInit {

    pub: Pub;
    private isNew: boolean = true;

    message: {};
    private currentTimeout: any;
    classesCss: {};

    authors: Array<Author>;
    publishers: Array<Publisher>;

    loadingPublishers: boolean = true;
    loadingAuthors: boolean = true;

    image: any;

    constructor(
        private pubService: PubService,
        private publisherService: PublisherService,
        private authorService: AuthorService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    onSubmit(): void{
        let promise;
        if(this.isNew){
            promise = this.pubService.create(this.pub);
        }else{
            promise = this.pubService.update(this.pub);
        }
        promise.then(contato => this.goBack())
            .catch((err: Error) => {
                this.mostrarMensagem({
                    type: 'danger', 
                    value: 'Erro ao salvar a publicação.'
                });
            });
    }

    getFormGroupClass(isValid: boolean, isPristine: boolean): {} {
        return{
            'form-group': true,
            'has-danger': !isValid && !isPristine
        }
    }

    getFormControlClass(isValid: boolean, isPristine: boolean): {} {
        return{
            'form-control': true,
            'form-control-danger': !isValid && !isPristine
        }
    }

    ngOnInit() {
        this.pub = new Pub(null, '', '', null, new Author(null, '', ''), new Publisher(null, ''), null);

        this.route.params.forEach((params: Params) => {
            let id: number = +params['id'];// + para converter em number
            if(id){
                this.isNew = false;
                this.pubService.find(id)
                    .then((pub: Pub) => {
                        this.pub.id = pub.id;
                        this.pub.title = pub.title;
                        this.pub.description = pub.description;
                        this.pub.type = pub.type;
                        
                        /* Get author */
                        this.pubService.findAuthor(id)
                            .then((author: Author) => {
                                this.pub.author = author;
                            });
                        /* Get publisher */
                        this.pubService.findPublisher(id)
                            .then((publisher: Publisher) => {
                                this.pub.publisher = publisher;
                            });
                    })
            }
        });

        this.authorService.findAll()
            .then((authors: Author[]) => {
                this.authors = authors;
                this.loadingAuthors = false;
            })
            .catch(err => {
                this.loadingAuthors = false;
                this.mostrarMensagem({
                    type: 'danger', 
                    value: 'Ocorreu um erro ao buscar a lista de autores.'
                });
            });

        this.publisherService.findAll()
            .then((publishers: Publisher[]) => {
                this.publishers = publishers;
                this.loadingPublishers = false;
            })
            .catch(err => {
                this.loadingPublishers = false;
                this.mostrarMensagem({
                    type: 'danger', 
                    value: 'Ocorreu um erro ao buscar a lista de editoras.'
                });
            });
     }

    enumKeys() : Array<string> {
        var keys = Object.keys(PubType);
        return keys.slice(keys.length / 2);
    }

    goBack(): void{
        this.location.back();
    }

    private mostrarMensagem(message: {type: string, value: string}): void{
        this.message = message;
        this.montarClasses(message.type);
        if(message.type !== 'danger'){
            if(this.currentTimeout)
                clearTimeout(this.currentTimeout);
            this.currentTimeout = setTimeout(() => {
                this.message = undefined;
            }, 3000);
        }
    }

    private montarClasses(type: string): void{
        this.classesCss = {
            'alert': true
        };
        this.classesCss['alert-' + type] = true;
    }
}