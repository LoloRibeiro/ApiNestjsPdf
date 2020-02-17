import { Injectable, HttpException } from '@nestjs/common';
const pdf = require('pdf-parse');


@Injectable()
export class DataService {

    // service which take a buffer (string) in parameter and return the text of the pdf
    getTextFromPdf = async (fileBuffer: string) => {
        return (pdf(fileBuffer).then(function(data) {
            return data.text;
        }).catch(function(error) {
            return null;
        }));
    };

    // service which take a buffer (string) in parameter and return the number of page
    getNumPagePdf = async (fileBuffer: string) => {
        return (pdf(fileBuffer).then(function(data) {
            return data.numrender;
        }).catch(function(error) {
            return null;
        }));
    }

    // service which take a buffer (string) in parameter and return some information of pdf
    getInfoPdf = async (fileBuffer: string) => {
        return (pdf(fileBuffer).then(function(data) {
            return data.info;
        }).catch(function(error) {
            return null;
        }));
    }
}
