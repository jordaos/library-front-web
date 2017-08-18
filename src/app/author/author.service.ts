import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';

import { ServiceInterface } from './../_interfaces/service.interface';
import { Author } from './author.model';

@Injectable()
export class AuthorService implements ServiceInterface<Author>{
    private authorUrl: string = 'https://secret-waters-63016.herokuapp.com/authors';
    private headers: Headers = new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });

    constructor(
        private http: Http
    ){}

    findAll(): Promise<Author[]> {
        return this.http.get(this.authorUrl)
            .toPromise()
            .then((response: Response) => {
                return response.json()._embedded.authors as Author[];
            })
            .catch((err) => this.handleError(err));
    }

    find(id: number): Promise<Author>{
        let url = `${this.authorUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then((response: Response) => {
                return response.json() as Author;
            })
            .catch((err) => this.handleError(err));
    }

    create(author: Author): Promise<Author>{
        return this.http
            .post(this.authorUrl, JSON.stringify(author), {headers: this.headers})
            .toPromise()
            .then((response: Response) => {
                return response.json() as Author;
            })
            .catch(this.handleError)
    }

    update(author: Author): Promise<Author>{
        const url = `${this.authorUrl}/${author.id}`;
        return this.http
            .put(url, JSON.stringify(author), {headers: this.headers})
            .toPromise()
            .then(() => author as Author)
            .catch(this.handleError)
    }

    delete(author: Author): Promise<Author>{
        const url = `${this.authorUrl}/${author.id}`;
        return this.http
            .delete(url, {headers: this.headers})
            .toPromise()
            .then(() => author as Author)
            .catch(this.handleError)
    }

    private handleError(err: any): Promise<any>{
        return Promise.reject(err.message || err);
    }
}