import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';

import { ServiceInterface } from './../_interfaces/service.interface';
import { Pub } from './pub.model';
import { Author } from './../author/author.model';
import { Publisher } from './../publisher/publisher.model';

@Injectable()
export class PubService implements ServiceInterface<Pub>{
    private pubUrl: string = 'https://secret-waters-63016.herokuapp.com/pubs';
    private headers: Headers = new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'enctype': 'multipart/form-data',
        'Accept': 'application/json'
    });

    constructor(
        private http: Http
    ){}

    findAll(): Promise<Pub[]> {
        return this.http.get(this.pubUrl)
            .toPromise()
            .then((response: Response) => {
                return response.json()._embedded.pubs as Pub[];
            })
            .catch((err) => this.handleError(err));
    }

    find(id: number): Promise<Pub>{
        let url = `${this.pubUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then((response: Response) => {
                return response.json() as Pub;
            })
            .catch((err) => this.handleError(err));
    }

    findAuthor(id: number): Promise<Author>{
        let url = `${this.pubUrl}/${id}/author`;
        return this.http.get(url)
            .toPromise()
            .then((response: Response) => {
                return response.json() as Author;
            })
            .catch((err) => this.handleError(err));
    }

    findPublisher(id: number): Promise<Publisher>{
        let url = `${this.pubUrl}/${id}/publisher`;
        return this.http.get(url)
            .toPromise()
            .then((response: Response) => {
                return response.json() as Publisher;
            })
            .catch((err) => this.handleError(err));
    }

    create(pub: Pub): Promise<Pub>{
        return this.http
            .post(this.pubUrl, JSON.stringify(pub), {headers: this.headers})
            .toPromise()
            .then((response: Response) => {
                return response.json() as Pub;
            })
            .catch(this.handleError)
    }

    update(pub: Pub): Promise<Pub>{
        const url = `${this.pubUrl}/${pub.id}`;
        return this.http
            .put(url, JSON.stringify(pub), {headers: this.headers})
            .toPromise()
            .then(() => pub as Pub)
            .catch(this.handleError)
    }

    delete(pub: Pub): Promise<Pub>{
        const url = `${this.pubUrl}/${pub.id}`;
        return this.http
            .delete(url, {headers: this.headers})
            .toPromise()
            .then(() => pub as Pub)
            .catch(this.handleError)
    }

    postWithFile (pub: Pub, files: File): any {
        let formData: FormData = new FormData();
        formData.append('image', files[0], files[0].name);

        pub.image = (files[0], files[0].name);

        console.log(pub);
        
        let headers = new Headers();
        var returnReponse = new Promise((resolve, reject) => {
            this.http.post(this.pubUrl, pub, {
                headers: headers
            }).subscribe(
                res => {
                    console.log("response: ", res.json());
                },
                error => {
                    console.log("error: ", error);
                }
            );
        });
        return returnReponse;
    }

    private handleError(err: any): Promise<any>{
        console.log(err);
        return Promise.reject(err.message || err);
    }
}