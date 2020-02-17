import { Injectable, HttpException } from '@nestjs/common';
const pdf = require('pdf-parse');
import {PDFExtract, PDFExtractOptions, PDFExtractResult} from 'pdf.js-extract';
import { CvService } from 'src/services/cv/cv.service';


@Injectable()
export class DataService {

    constructor( private readonly cvService: CvService) {}

    /**
     * Return Value Type: array[]
     * Function : return the text of the pdf
     * Error code : null
     * Sucess code : 200
     */
    getTextFromPdf = async (filePath: string) => {
        let text = [];
        const pdfExtract = new PDFExtract();
        const options: PDFExtractOptions = {};
        return (pdfExtract.extract(filePath, options)
        .then(async data => {
            data = await this.cvService.parsePdfInfo(data);
            data.pages.forEach(element => {
                element.content.forEach(e => {
                    text.push(e.str);
                });
            })
            return(text);
        }).catch(function(error) {
                return null;
            }));
        };

     /**
     * Return Value Type: number
     * Function : return the number of page in a pdf
     * Error code : null
     * Sucess code : 200
     */
    getNumPagePdf = async (filePath: string) => {
        const pdfExtract = new PDFExtract();
        const options: PDFExtractOptions = {};
        return (pdfExtract.extract(filePath, options)
        .then(async data => {
            return(data.pages.length);
        }).catch(function(error) {
                return null;
        }));
    }


     /**
     * Return Value Type: array[]
     * Function : return some information about the pdf (PDFFormatVersion, Creator, Author, Title)
     * Error code : null
     * Sucess code : 200
     */
    getInfoPdf = async (filePath: string) => {
        const pdfExtract = new PDFExtract();
        const options: PDFExtractOptions = {};
        return (pdfExtract.extract(filePath, options)
        .then(async data => {
            return(data.meta.info);
        }).catch(function(error) {
                return null;
        }));
    }
}
