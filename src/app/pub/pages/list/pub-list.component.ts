import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { Pub } from "./../../pub.model";
import { PubService } from './../../pub.service';

@Component({
    selector: 'pub-list',
    templateUrl: './pub-list.component.html',
    styleUrls: ['./pub-list.component.css']
})
export class PubListComponent implements OnInit {
    pubs: Pub[] = [];
    message: {};
    private currentTimeout: any;
    classesCss: {};
    itsLoading = true;

    toBeDeleted: Pub;

    constructor(
         private pubService: PubService,
         private modalService: NgbModal
    ){}

    ngOnInit(): void{
        this.pubService.findAll()
            .then((pubs: Pub[]) => {
                this.pubs = pubs;
                this.itsLoading = false;
            })
            .catch(err => {
                this.mostrarMensagem({
                    type: 'danger', 
                    value: 'Ocorreu um erro ao buscar a lista de publicações.'
                });
                this.itsLoading = false;
            });
    }

    onDelete(pub: Pub, content: any): void{
        console.log(pub);
        this.toBeDeleted = pub;
        this.modalService.open(content).result.then((result) => {
                this.pubService.delete(pub)
                    .then(() => {
                        var index = this.pubs.indexOf(pub);
                        this.pubs.splice(index, 1);
                        this.mostrarMensagem({
                            type: 'success', 
                            value: 'Publicação deletada.'
                        });
                    }).catch((err: Error) => {
                        this.mostrarMensagem({
                            type: 'danger', 
                            value: 'Erro ao deletar publicação.'
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