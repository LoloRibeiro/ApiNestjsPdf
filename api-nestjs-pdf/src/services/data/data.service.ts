import { Injectable } from '@nestjs/common';

@Injectable()
export class DataService {

    // service which take a buffer (string) in parameter and return the text of the pdf
    getTextFromPdf = async (fileBuffer: string) => {
        const pdf = require('pdf-parse');
        return (pdf(fileBuffer).then(function(data) {
            return data.text;
        }).catch(function(error) {
            return error;
        }));
    };

    // service which take a buffer (string) in parameter and return the number of page
    getNumPagePdf = async (fileBuffer: string) => {
        const pdf = require('pdf-parse');
        return (pdf(fileBuffer).then(function(data) {
            return data.numrender;
        }).catch(function(error) {
            return error;
        }));
    }

    // service which take a buffer (string) in parameter and return some information of pdf
    getInfoPdf = async (fileBuffer: string) => {
        const pdf = require('pdf-parse');
        return (pdf(fileBuffer).then(function(data) {
            return data.info;
        }).catch(function(error) {
            return error;
        }));
    }
}
