import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { Publisher } from "./../../publisher.model";
import { PublisherService } from './../../publisher.service';

@Component({
    selector: 'publisher-list',
    templateUrl: './publisher-list.component.html',
    styleUrls: ['./publisher-list.component.css']
})
export class PublisherListComponent implements OnInit {
    publishers: Publisher[] = [];
    message: {};
    private currentTimeout: any;
    classesCss: {};
    itsLoading = true;

    toBeDeleted: Publisher;

    constructor(
         private publisherService: PublisherService,
         private modalService: NgbModal
    ){}

    ngOnInit(): void{
        this.publisherService.findAll()
            .then((publishers: Publisher[]) => {
                this.publishers = publishers;
                this.itsLoading = false;
            })
            .catch(err => {
                this.mostrarMensagem({
                    type: 'danger', 
                    value: 'Ocorreu um erro ao buscar a lista de editoras.'
                });
                this.itsLoading = false;
            });
    }

    onDelete(publisher: Publisher, content: any): void{
        console.log(publisher);
        this.toBeDeleted = publisher;
        this.modalService.open(content).result.then((result) => {
                this.publisherService.delete(publisher)
                    .then(() => {
                        var index = this.publishers.indexOf(publisher);
                        this.publishers.splice(index, 1);
                        this.mostrarMensagem({
                            type: 'success', 
                            value: 'Editora deletada.'
                        });
                    }).catch((err: Error) => {
                        this.mostrarMensagem({
                            type: 'danger', 
                            value: 'Erro ao deletar editora.'
                        });
                    });
            }, (reason) => {});
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