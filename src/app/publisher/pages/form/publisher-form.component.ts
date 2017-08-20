import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { PublisherService } from './../../publisher.service';
import { Publisher } from './../../publisher.model';

@Component({
    selector: 'publisher-form',
    templateUrl: './publisher-form.component.html',
    styleUrls: ['./publisher-form.component.css']
})

export class PublisherFormComponent implements OnInit {

    publisher: Publisher;
    private isNew: boolean = true;

    message: {};
    private currentTimeout: any;
    classesCss: {};

    constructor(
        private publisherService: PublisherService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    onSubmit(): void{
        let promise;
        if(this.isNew){
            promise = this.publisherService.create(this.publisher);
        }else{
            promise = this.publisherService.update(this.publisher);
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
        this.publisher = new Publisher(null, '');

        this.route.params.forEach((params: Params) => {
            let id: number = +params['id'];// + para converter em number
            if(id){
                this.isNew = false;
                this.publisherService.find(id)
                    .then((publisher: Publisher) => {
                        this.publisher = publisher;
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