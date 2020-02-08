import { Injectable } from '@nestjs/common';

@Injectable()
export class DataService {

    getTextFromPdf = async (fileBuffer: string) => {
        const pdf = require('pdf-parse');
        return (pdf(fileBuffer).then(function(data) {
            return data.text;
        }).catch(function(error) {
            return (error);
        }));
    };
}
