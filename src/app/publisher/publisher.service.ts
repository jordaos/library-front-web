import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';

import { ServiceInterface } from './../_interfaces/service.interface';
import { Publisher } from './publisher.model';

@Injectable()
export class PublisherService implements ServiceInterface<Publisher>{
    private publisherUrl: string = 'https://secret-waters-63016.herokuapp.com/publishers';
    private headers: Headers = new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });

    constructor(
        private http: Http
    ){}

    findAll(): Promise<Publisher[]> {
        return this.http.get(this.publisherUrl)
            .toPromise()
            .then((response: Response) => {
                return response.json()._embedded.publishers as Publisher[];
            })
            .catch((err) => this.handleError(err));
    }

    find(id: number): Promise<Publisher>{
        let url = `${this.publisherUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then((response: Response) => {
                return response.json() as Publisher;
            })
            .catch((err) => this.handleError(err));
    }

    create(publisher: Publisher): Promise<Publisher>{
        return this.http
            .post(this.publisherUrl, JSON.stringify(publisher), {headers: this.headers})
            .toPromise()
            .then((response: Response) => {
                return response.json() as Publisher;
            })
            .catch(this.handleError)
    }

    update(publisher: Publisher): Promise<Publisher>{
        const url = `${this.publisherUrl}/${publisher.id}`;
        return this.http
            .put(url, JSON.stringify(publisher), {headers: this.headers})
            .toPromise()
            .then(() => publisher as Publisher)
            .catch(this.handleError)
    }

    delete(publisher: Publisher): Promise<Publisher>{
        const url = `${this.publisherUrl}/${publisher.id}`;
        return this.http
            .delete(url, {headers: this.headers})
            .toPromise()
            .then(() => publisher as Publisher)
            .catch(this.handleError)
    }

    private handleError(err: any): Promise<any>{
        return Promise.reject(err.message || err);
    }
}