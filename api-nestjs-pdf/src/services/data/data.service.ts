import { Injectable } from '@nestjs/common';

@Injectable()
export class DataService {

    getTextFromPdf = async (fileBuffer: string) => {
        const pdf = require('pdf-parse');
        return (pdf(fileBuffer).then(function(data) {
            return data.text;
        }).catch(function(error) {
            return error;
        }));
    };

    getNumPagePdf = async (fileBuffer: string) => {
        const pdf = require('pdf-parse');
        return (pdf(fileBuffer).then(function(data) {
            return data.numrender;
        }).catch(function(error) {
            return error;
        }));
    }

    getInfoPdf = async (fileBuffer: string) => {
        const pdf = require('pdf-parse');
        return (pdf(fileBuffer).then(function(data) {
            return data.info;
        }).catch(function(error) {
            return error;
        }));
    }
}
