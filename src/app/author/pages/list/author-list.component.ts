import { Component, OnInit } from '@angular/core';

import { Author } from "./../../author.model";
import { AuthorService } from './../../author.service';

@Component({
    moduleId: module.id,
    selector: 'author-lista',
    templateUrl: './author-list.component.html',
    styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {
    authors: Author[] = [];
    message: {};
    private currentTimeout: any;
    classesCss: {};
    itsLoading = true;

    constructor(
         private authorService: AuthorService
    ){}

    ngOnInit(): void{
        this.authorService.findAll()
            .then((authors: Author[]) => {
                this.authors = authors;
                this.itsLoading = false;
            })
            .catch(err => {
                this.mostrarMensagem({
                    type: 'danger', 
                    value: 'Ocorreu um erro ao buscar a lista de autores.'
                });
                this.itsLoading = false;
            });
    }

    //Sem confirmação
    onDelete(author: Author): void{
        this.authorService.delete(author)
            .then(() => {
                var index = this.authors.indexOf(author);
                this.authors.splice(index, 1);
                this.mostrarMensagem({
                    type: 'success', 
                    value: 'Contato deletado.'
                });
            }).catch((err: Error) => {
                this.mostrarMensagem({
                    type: 'danger', 
                    value: 'Erro ao deletar contato.'
                });
            });
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