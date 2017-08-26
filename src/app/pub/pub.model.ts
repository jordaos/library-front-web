import { Author } from './../author/author.model';
import { Publisher } from './../publisher/publisher.model';
import { PubType } from './pub-type.enum';

export class Pub {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public type: PubType,
        public author: Author,
        public publisher: Publisher,
        public image: File
    ){}
}