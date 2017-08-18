import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { AuthorService } from './../../author.service';
import { Author } from './../../author.model';

@Component({
    moduleId: module.id,
    selector: 'author-form',
    templateUrl: './author-form.component.html',
    styleUrls: ['./author-form.component.css']
})

export class AuthorFormComponent implements OnInit {

    author: Author;
    private isNew: boolean = true;

    message: {};
    private currentTimeout: any;
    classesCss: {};

    constructor(
        private authorService: AuthorService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    onSubmit(): void{
        let promise;
        if(this.isNew){
            promise = this.authorService.create(this.author);
        }else{
            promise = this.authorService.update(this.author);
        }
        promise.then(contato => this.goBack())
            .catch((err: Error) => {
                this.mostrarMensagem({
                    type: 'danger', 
                    value: 'Erro ao salvar o contato.'
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
        this.author = new Author(null, '', '');

        this.route.params.forEach((params: Params) => {
            let id: number = +params['id'];// + para converter em number
            if(id){
                this.isNew = false;
                this.authorService.find(id)
                    .then((author: Author) => {
                        this.author = author;
                    })
            }
        });
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